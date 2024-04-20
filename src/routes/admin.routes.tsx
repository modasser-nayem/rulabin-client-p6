import Dashboard from "../pages/Dashboard/Dashboard";
import { TRoutesItem } from "../types/routes.types";
import { MdDashboard, MdCategory } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { TbBrandAirtable } from "react-icons/tb";
import { BsBoxSeamFill } from "react-icons/bs";
import Categories from "../pages/Category/Categories";
import AddCategory from "../pages/Category/AddCategory";
import UpdateCategory from "../pages/Category/UpdateCategory";
import Brands from "../pages/Brand/Brands";
import AddBrand from "../pages/Brand/AddBrand";
import UpdateBrand from "../pages/Brand/UpdateBrand";
import AddProduct from "../pages/Product/AddProduct";
import ProductsForAdmin from "../pages/Product/ProductsForAdmin";
import UpdateProduct from "../pages/Product/UpdateProduct";

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
      name: "Brand",
      path: "brand",
      icon: <TbBrandAirtable />,
      element: <Brands />,
   },
   {
      path: "add-brand",
      element: <AddBrand />,
   },
   {
      path: "update-brand/:brandId",
      element: <UpdateBrand />,
   },
   {
      name: "Products",
      path: "products",
      icon: <BsBoxSeamFill />,
      element: <ProductsForAdmin />,
   },
   {
      path: "add-product",
      element: <AddProduct />,
   },
   {
      path: "update-product/:productId",
      element: <UpdateProduct />,
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
