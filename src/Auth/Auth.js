import history from "../history";
import initializeAuth from "./AuthInitializer.js";

export default class Auth {
  accessToken;
  idToken;
  expiresAt;

  auth0;
  user = {
    email: "",
    emailVerified: "",
    name: "",
    userId: "",
    user_metadata: {}
  };

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);

    //Initialize Auth0 object with configuration data from server
    initializeAuth()
      .then(authObj => {
        this.auth0 = authObj;

        this.handleAuthentication();
        this.renewSession();
      })
      .catch(error => {
        console.log("Auth0 could not be initialized: " + error);
      });
  }

  login() {
    if (this.auth0 != null) {
      this.auth0.authorize();
    }
  }

  handleAuthentication() {
    if (this.auth0 != null) {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
        } else if (err) {
          history.replace("/");
          console.log(err);
          //alert(Error: ${err.error}. Check the console for further details.);
        }
      });
    }
  }

  getAccessToken() {
    if (this.auth0 != null) {
      return this.accessToken;
    }

    return null;
  }

  getIdToken() {
    if (this.auth0 != null) {
      return this.idToken;
    }

    return null;
  }

  getUserEmail() {
    if (this.auth0 != null) {
      return this.user.email;
    }

    return null;
  }

  getUserName() {
    if (this.auth0 != null) {
      return this.user.name;
    }

    return null;
  }

  getUserEmailVerified() {
    if (this.auth0 != null) {
      return this.user.emailVerified;
    }

    return null;
  }

  getUserId() {
    if (this.auth0 != null) {
      return this.user.userId;
    }

    return null;
  }

  getUserType() {
    if (this.auth0 != null) {
      return this.user.user_metadata.userType;
    }

    return null;
  }

  getUserMetaData() {
    if (this.auth0 != null) {
      return this.user.user_metadata;
    }

    return null;
  }

  getUser() {
    if (this.auth0 != null) {
      return this.user;
    }

    return null;
  }

  //Stores information about the currently signed in user
  saveCurrentUserInfo(authResult) {
    var idTokenPayload = authResult.idTokenPayload;

    this.user.email = idTokenPayload.email;
    this.user.emailVerified = idTokenPayload.emailVerified;
    this.user.name = idTokenPayload.name;
    this.user.userId = idTokenPayload.sub;
    this.user.user_metadata = idTokenPayload["http://userMetadata"];
  }

  setSession(authResult) {
    if (this.auth0 != null) {
      // Set isLoggedIn flag in localStorage
      localStorage.setItem("isLoggedIn", "true");

      // Set the time that the access token will expire at
      let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

      this.accessToken = authResult.accessToken;
      this.idToken = authResult.idToken;
      this.expiresAt = expiresAt;
      this.saveCurrentUserInfo(authResult);

      // navigate to the home route
      history.replace("/");
    }
  }

  renewSession() {
    if (this.auth0 != null) {
      this.auth0.checkSession({}, (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
        } else if (err) {
          if (this.isAuthenticated()) this.logout();
          console.log(err);
          //alert(Could not get a new token (${err.error}: ${err.error_description}).);
        }
      });
    }
  }

  logout() {
    if (this.auth0 != null) {
      // Remove tokens and expiry time
      this.accessToken = null;
      this.idToken = null;
      this.expiresAt = 0;

      // Remove isLoggedIn flag from localStorage
      localStorage.removeItem("isLoggedIn");

      this.auth0.logout({
        returnTo: window.location.origin
      });

      // navigate to the home route
      history.replace("/");
    }
  }

  isAuthenticated() {
    if (this.auth0 != null) {
      // Check whether the current time is past the
      // access token's expiry time
      let expiresAt = this.expiresAt;
      return new Date().getTime() < expiresAt;
    }

    return false;
  }
}
