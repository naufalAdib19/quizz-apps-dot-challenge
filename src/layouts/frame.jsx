import React, { useContext } from "react";
import Navbar from "../components/navbar/navbar";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../services/context/authcontext/AuthContext";

const Frame = () => {
  //Conditional Rendering TopBar
  const location = useLocation();
  const isOnAuthenticationPage = location.pathname === "/login";
  const { isUserLoggedIn } = useContext(AuthContext);

  if (isUserLoggedIn) {
    return (
      <div>
        {!isOnAuthenticationPage && <Navbar />}
        <Outlet />
      </div>
    );
  }

  return <Navigate to="/login" />;
};

export default Frame;
