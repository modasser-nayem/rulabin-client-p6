import { createBrowserRouter } from "react-router-dom";
import { routesGenerator } from "../utils/routesGenerator";
import { adminRouteItems } from "./admin.routes";
import DashboardLayout from "../components/layout/DashboardLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import LoginProtectedRoute from "./LoginProtectedRoute";
import PublicLayout from "../components/layout/PublicLayout";
import { sellerRouteItems } from "./seller.routes";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <PublicLayout />,
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
      path: "/admin",
      element: (
         <ProtectedRoute role="admin">
            <DashboardLayout />
         </ProtectedRoute>
      ),
      children: routesGenerator(adminRouteItems),
   },
   {
      path: "/seller",
      element: (
         <ProtectedRoute role="seller">
            <DashboardLayout />
         </ProtectedRoute>
      ),
      children: routesGenerator(sellerRouteItems),
   },
   {
      path: "/login",
      element: (
         <LoginProtectedRoute>
            <Login />
         </LoginProtectedRoute>
      ),
   },
   {
      path: "/register",
      element: (
         <LoginProtectedRoute>
            <Register />
         </LoginProtectedRoute>
      ),
   },
   {
      path: "/forgot-password",
      element: (
         <LoginProtectedRoute>
            <ForgotPassword />
         </LoginProtectedRoute>
      ),
   },
   {
      path: "/auth/reset-password",
      element: (
         <LoginProtectedRoute>
            <ResetPassword />
         </LoginProtectedRoute>
      ),
   },
]);
