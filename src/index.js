import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import routes from "./routes";
import { Router, Route, Switch, Redirect } from "react-router-dom";
// core components
import Admin from "layouts/Admin.js";
import "assets/css/material-dashboard-react.css?v=1.8.0";
import SignIn from "views/SignIn/SignIn";
import Dashboard from "views/Dashboard/Dashboard";

const hist = createBrowserHistory();
// const routes = mainRoutes();

// ReactDOM.render(
//   <Router history={hist}>
//     <Switch>
//       <Route path="/admin" component={Admin} />
//       <Redirect from="/" to="/admin/dashboard" />
//     </Switch>
//   </Router>,
//   routes,
//   document.getElementById("root")
// );

class Index extends Component {
  render(){
    return(
      <div>
        <Router history={hist}>
   <Switch>
      <Route path="/admin" component={Admin} />
       <Redirect from="/" to="dashboard" />
     </Switch>
   </Router>,
    </div>
    )
  }
}
ReactDOM.render(<Index />, document.getElementById("root"))
