import { TRoute, TRoutesItem } from "../types/routes.types";

export const routesGenerator = (routeItems: TRoutesItem[]) => {
   const routes = routeItems.reduce((acc: TRoute[], item) => {
      if (item.index) {
         acc.push({
            index: item.index,
            element: item.element,
         });
      }

      if (item.path) {
         acc.push({
            path: item.path,
            element: item.element,
         });
      }
      if (item.children) {
         item.children.forEach((child) => {
            acc.push({
               path: child.path!,
               element: child.element,
            });
         });
      }
      return acc;
   }, []);

   return routes;
};
