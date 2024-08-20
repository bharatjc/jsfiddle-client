import { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import PageNotFound from "./Pages/PageNotFound";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./ResetPassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home/>
      ),
    },
    {
      path: "login",
      element: <Login/>,
    },
    {
      path: "signup",
      element: <SignUp/>,
    },
    {
      path: "forgotPassword",
      element: <ForgotPassword/>,
    },
    {
      path: "resetPassword/:id/:token",
      element: <ResetPassword/>,
    },
    {
      path: "*",
      element: <PageNotFound/>
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
