import React, { useContext } from "react";
import { Button } from "@mui/material";
import { auth } from "../../services/firebase";
import { AuthContext } from "../../services/context/authcontext/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const logoutButtonHandle = () => {
    auth.signOut();
  };

  return (
    <div className="py-5 px-5 md:px-12 bg-blue-500 font-semibold text-white flex justify-between items-center">
      <p>Hi, {user?.displayName || "..."}</p>
      <Button variant="contained" color="error" onClick={logoutButtonHandle}>
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
