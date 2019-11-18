/*eslint no-restricted-globals: 0*/
import React, { Component } from "react";
import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";

//define the constants
const LOGIN_SUCCESS_PAGE = "./";
const LOGIN_FAILURE_PAGE = "./";

class Auth extends Component {
  auth0 = new auth0.WebAuth({
    domain: "dev--410z9ms.auth0.com",
    clientID: "QaUHaPUcfd3szx6Xn0b1SXjI4WiUnzBS",
    redirectUri: "http://localhost:3000/callback",
    audience: "https://dev--410z9ms.auth0.com/userinfo",
    responseType: "token id_token",
    scope: "openid profile"
  });

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("id_token", authResults.idToken);
        localStorage.setItem("expires_at", expiresAt);
        location.hash = "";
        location.pathname = LOGIN_SUCCESS_PAGE;
      } else if (err) {
        location.pathname = LOGIN_FAILURE_PAGE;
        console.log(err);
      }
    });
  }

  //return true if the user is authenticated
  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    location.pathname = LOGIN_FAILURE_PAGE;
  }

  getProfile() {
    if (localStorage.getItem("id_token")) {
      return jwtDecode(localStorage.getItem("id_token"));
    } else {
      console.log("user not found");
    }
  }
}

export default Auth;
