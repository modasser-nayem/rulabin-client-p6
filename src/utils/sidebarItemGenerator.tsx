import { NavLink } from "react-router-dom";
import { TRoutesItem, TSidebarItem } from "../types/routes.types";

type TSidebarItemGeneratorProps = {
   routePrefix: string;
   routeItems: TRoutesItem[];
};
export const sidebarItemsGenerator = ({
   routePrefix,
   routeItems,
}: TSidebarItemGeneratorProps) => {
   const sidebarItems = routeItems.reduce((acc: TSidebarItem[], item) => {
      if (item.path && !item.path.includes("/:") && item.name) {
         acc.push({
            key: item.path,
            icon: item.icon,
            label: (
               <NavLink to={`${routePrefix}/${item.path}`}>{item.name}</NavLink>
            ),
         });
      }

      if (item?.children && item?.name) {
         acc.push({
            key: item.name,
            icon: item.icon,
            label: item.name,
            children: item.children.map((child) => {
               return {
                  key: child.name || "",
                  icon: child.icon,
                  label: (
                     <NavLink to={`${routePrefix}/${child.path}`}>
                        {child.name}
                     </NavLink>
                  ),
               };
            }),
         });
      }

      return acc;
   }, []);

   return sidebarItems;
};
