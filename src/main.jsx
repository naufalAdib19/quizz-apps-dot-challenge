import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./views/Login.jsx";
import Home from "./views/Home.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Frame from "./layouts/frame.jsx";
import { AuthProvider } from "./services/context/authcontext/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Frame />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
