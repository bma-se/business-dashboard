// import Dashboard from "@material-ui/icons/Dashboard";
// import Settings from "@material-ui/icons/Settings";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Create from "@material-ui/icons/Create";
// import Description from "@material-ui/icons/Description";

// // core components/views for Admin layout
// import DashboardPage from "views/Dashboard/Dashboard.js";
// import UserProfile from "views/UserProfile/UserProfile.js";
// import TableList from "views/TableList/TableList.js";
// import Summary from "views/Summary/Summary.js";

// import Icons from "views/Icons/Icons.js";

// import NotificationsPage from "views/Notifications/Notifications.js";
// // core components/views for RTL layout

// const dashboardRoutes = [
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     icon: Dashboard,
//     component: DashboardPage,
//     layout: "/admin"
//   },
//   {
//     path: "/table",
//     name: "Reports",
//     icon: "content_paste",
//     component: TableList,
//     layout: "/admin"
//   },
//   {
//     path: "/user",
//     name: "Boundaries",
//     icon: Create,
//     component: UserProfile,
//     layout: "/admin"
//   },
//   {
//     path: "/summary",
//     name: "Settings",
//     icon: Settings,
//     component: Summary,
//     layout: "/admin"
//   }
// ];

// export default dashboardRoutes;

import React from "react";
import { Route, Router } from "react-router-dom";
import App from "./App";
import Callback from "./Callback/Callback";
import Auth from "./Auth/Auth";
import history from "./history";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const mainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={props => <App auth={auth} {...props} />} />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
    </Router>
  );
};
