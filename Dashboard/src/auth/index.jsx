import React from "react";
import Login from "./Login";
import { Outlet } from "react-router-dom";

export default function Auth() {
  return <Outlet />;
}

export { Login };
