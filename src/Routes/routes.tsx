import React from "react";
import { Routes as RoutesDOMRoute, Route } from "react-router-dom";
import Login from "../Pages/Login/Login";
import ForgotPassword from "../Pages/ForgotPassword";

const Routes: React.FC = () => {
  return (
    <RoutesDOMRoute>
      <Route path="/" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
    </RoutesDOMRoute>
  );
};

export default Routes;
