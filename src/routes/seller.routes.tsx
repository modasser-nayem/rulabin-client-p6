import Dashboard from "../pages/Dashboard/Dashboard";
import { TRoutesItem } from "../types/routes.types";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";

export const sellerRouteItems: TRoutesItem[] = [
   {
      name: "Dashboard",
      path: "dashboard",
      icon: <MdDashboard />,
      element: <Dashboard />,
   },
   {
      name: "User Management",
      icon: <HiUsers />,
      children: [
         {
            name: "All Users",
            path: "users",
            element: <div>All Users</div>,
         },
         {
            name: "Update user",
            path: "users/:id",
            element: <div>Update Users</div>,
         },
      ],
   },
];
