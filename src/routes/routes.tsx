import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routesGenerator } from "../utils/routesGenerator";
import { adminRouteItems } from "./admin.routes";
import DashboardLayout from "../components/layout/DashboardLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
   },
   {
      path: "/admin",
      element: <DashboardLayout />,
      children: routesGenerator(adminRouteItems),
   },
   {
      path: "/seller",
      children: [
         {
            index: true,
            element: <div>Seller Dashboard</div>,
         },
         {
            path: "dashboard",
            element: <div>Customer Dashboard</div>,
         },
      ],
   },
   {
      path: "/customer",
      children: [
         {
            index: true,
            element: <div>Customer Dashboard</div>,
         },
         {
            path: "dashboard",
            element: <div>Customer Dashboard</div>,
         },
      ],
   },
   {
      path: "/login",
      element: <Login />,
   },
   {
      path: "/register",
      element: <Register />,
   },
   {
      path: "/forgot-password",
      element: <ForgotPassword />,
   },
]);
