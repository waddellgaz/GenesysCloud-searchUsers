//Environment info
const platformClient = require('purecloud-platform-client-v2');
const client = platformClient.ApiClient.instance;
client.config.setConfigPath('C:\Git\GenesysCloud-searchUsers\config');
client.setEnvironment(platformClient.PureCloudRegionHosts.eu_west_2);

//oAuth details, these should be added to your system as an environment variable
clientId = process.env.GENESYS_CLIENT_ID
clientSecret = process.env.GENESYS_CLIENT_SECRET

// Create API instances
const authorizationApi = new platformClient.AuthorizationApi();
let apiInstance = new platformClient.SearchApi();

//Auth
client.loginClientCredentialsGrant(clientId, clientSecret)
  .then(() => {
    console.log("Authenticated!");

    //define payload
    var queryBody = {
      "query": [
        {
          "value": "gary.waddell@sabiogroup.com",
          "fields": [
            "addresses.email"
          ],
          "type": "EXACT"
        }
      ]
    };

    //perform the search
    apiInstance.postUsersSearch(queryBody)
      .then((data) => {
        console.log(`search success!`);

        var userId = data.results[0].id;

        console.log(`User ID :` + userId);

      })
      .catch((err) => {
        console.log('There was a failure calling getRoutingQueues');
        console.error(err);
      });
  });