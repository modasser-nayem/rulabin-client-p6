import { TRoutesItem } from "../types/routes.types";
import { HiUsers } from "react-icons/hi";

export const customerRouteItems: TRoutesItem[] = [
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
