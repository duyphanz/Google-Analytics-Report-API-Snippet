const { google } = require('googleapis');

const scopes = 'https://www.googleapis.com/auth/analytics.readonly'

const keys = {
  "private_key": "XXXXXX",
  "client_email": "XXXXX",
}


const jwt = new google.auth.JWT(keys.client_email, null, keys.private_key, scopes);

// const viewId = '194263314';
const viewId = 'XXXXXXXX';

const analyticsreporting = google.analyticsreporting({
  version: 'v4',
  auth: jwt,
});

async function runSample() {
  const res = await analyticsreporting.reports.batchGet({
    requestBody: {
      reportRequests: [
        {
          viewId,
          dateRanges: [
            {
              startDate: '2019-06-14',
              endDate: '2019-06-15',
            },
          ],
          metrics: [
            {
              expression: 'ga:entrances',
            },
          ],
          dimensions: [
            {
              name: 'ga:pagePath'
            }
          ],
          dimensionFilterClauses: [
            {
              filters: [
                {
                  dimensionName: "ga:pagePath",
                  expressions: [
                    ".+"
                  ]
                }
              ]
            }
          ],
        },
      ],
    },
  });
  console.log(res.data);
  return res.data;
}

async function getData() {
  const response = await jwt.authorize()
  const result = await runSample()
  console.log(JSON.stringify(result));
}

getData();
