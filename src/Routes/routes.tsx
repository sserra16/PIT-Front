import React from "react";
import {
  Routes as RoutesDOMRoute,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import ResetPassword from "../Pages/Auth/ResetPassword";
import Layout from "../Pages/Auth/Layout";
import Home from "../Pages/Home";
import NotAuthenticaded from "../Pages/NotAuthenticaded";
import Landing from "../Pages/Landing";
import MapContainer from "../Pages/Mapa";
// import Layout from "../Pages/Auth/Layout";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <RoutesDOMRoute>
        <Route path="/" element={<Landing />} />

        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <Layout>
              <ForgotPassword />
            </Layout>
          }
        />
        <Route
          path="/resetpassword/:token?/:email?"
          element={
            <Layout>
              <ResetPassword />
            </Layout>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/mapa" element={<MapContainer />} />
        <Route path="/erro" element={<NotAuthenticaded />} />
      </RoutesDOMRoute>
    </BrowserRouter>
  );
};

export default Routes;
