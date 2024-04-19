import Dashboard from "../pages/Dashboard/Dashboard";
import { TRoutesItem } from "../types/routes.types";
import { MdDashboard, MdCategory } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import Categories from "../pages/Category/Categories";
import AddCategory from "../pages/Category/AddCategory";
import UpdateCategory from "../pages/Category/UpdateCategory";

export const adminRouteItems: TRoutesItem[] = [
   {
      index: true,
      element: <Dashboard />,
   },
   {
      name: "Dashboard",
      path: "dashboard",
      icon: <MdDashboard />,
      element: <Dashboard />,
   },
   {
      name: "Categories",
      path: "categories",
      icon: <MdCategory />,
      element: <Categories />,
   },
   {
      path: "add-category",
      element: <AddCategory />,
   },
   {
      path: "update-category/:categoryId",
      element: <UpdateCategory />,
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
