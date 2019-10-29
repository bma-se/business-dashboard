import React, { Component } from "react";
// import "./App.css";
import Dashboard from "./views/Dashboard/Dashboard";
import SignIn from "./views/SignIn/SignIn";
class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem("isLoggedIn") === "true") {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return isAuthenticated() ? (
      <Dashboard auth={this.props.auth} />
    ) : (
      <SignIn auth={this.props.auth} />
    );
  }
}

export default App;
