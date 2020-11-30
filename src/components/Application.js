import Login from "./Login";
import Users from "./Users";
import ReactGA from "react-ga";
import { useEffect } from "react";

const Application = () => {
  // send a pageview when the app init
  useEffect(() => {
    // Enable debug mode on the local development environment
    const isDev =
      !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, { debug: isDev });
    ReactGA.pageview(window.location.pathname);
  });

  return (
    <div>
      <Login />
      <Users />
    </div>
  );
};

export default Application;
