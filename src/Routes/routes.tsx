import React from "react";
import { Routes as RoutesDOMRoute, Route } from "react-router-dom";
import Login from "../Pages/Login/Login";
import ForgotPassword from "../Pages/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword";

const Routes: React.FC = () => {
  return (
    <RoutesDOMRoute>
      <Route path="/" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
    </RoutesDOMRoute>
  );
};

export default Routes;
