import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routesGenerator } from "../utils/routesGenerator";
import { adminRouteItems } from "./admin.routes";
import DashboardLayout from "../components/layout/DashboardLayout";

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
            element: <div>Seller Dashboard</div>,
         },
      ],
   },
]);
