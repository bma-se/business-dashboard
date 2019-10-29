import xhr from "../ApiHelper.js";
import auth0 from "auth0-js";

//Initialize JSON object for creating a new auth0.WebAuth
function initializeAuth(onSuccess, onFail) {
  var authObj = {
    domain: "",
    clientID: "",
    redirectUri: `${window.location.origin}/callback`,
    audience: "",
    responseType: "token id_token",
    scope: "openid profile email user_metadata" //Configures auth0 to return information about the currently logged in user
  };

  return new Promise((resolve, reject) => {
    //GET domain for auth0 application
    const domainEndpoint = "api/auth0/domain";
    xhr()
      .get(domainEndpoint)
      .then(function(response) {
        authObj.domain = response.data.domain;
        authObj.audience = `https://${response.data.domain}/userinfo`;

        //GET client ID for auth0 application
        const clientIdEndpoint = "api/auth0/client_id";
        xhr()
          .get(clientIdEndpoint)
          .then(function(response) {
            authObj.clientID = response.data.clientID;

            resolve(new auth0.WebAuth(authObj));
          })
          .catch(function(error) {
            console.log("Failed to get client ID");

            reject("Failed to get client ID");
          });
      })
      .catch(function(error) {
        console.log("Failed to get domain");

        reject("Failed to get domain");
      });
  });
}

export default initializeAuth;
