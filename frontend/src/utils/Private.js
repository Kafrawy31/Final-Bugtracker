"use client";

import { Route, Redirect, Navigate } from "react-router-dom";

import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.js";

const Private = ({ children }) => {
  let { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/Login" />;
};

export default Private;
