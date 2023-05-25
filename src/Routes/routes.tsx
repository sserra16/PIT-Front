import React from "react";
import { Routes as RoutesDOMRoute, Route } from "react-router-dom";
import Login from "../Pages/Login/Login";

const Routes: React.FC = () => {
  return (
    <RoutesDOMRoute>
      <Route path="/" element={<Login />} />
    </RoutesDOMRoute>
  );
};

export default Routes;
