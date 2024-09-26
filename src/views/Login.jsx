import SignIn from "../components/auth/SignIn";
import { useContext } from "react";
import { AuthContext } from "../services/context/authcontext/AuthContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { isUserLoggedIn } = useContext(AuthContext);

  if (isUserLoggedIn) {
    return <Navigate to="/Home" />;
  }

  return (
    <div className="bg-blue-100">
      <SignIn></SignIn>
    </div>
  );
};

export default Login;
