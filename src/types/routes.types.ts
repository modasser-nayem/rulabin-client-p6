import { ReactNode } from "react";

export type TRoutesItem = {
   name?: string;
   path?: string;
   element?: ReactNode;
   icon?: ReactNode;
   children?: TRoutesItem[];
};

export type TRoute = {
   path?: string;
   element?: ReactNode;
   children?: TRoute[];
};

export type TSidebarItem = {
   key: string;
   label: ReactNode;
   children?: TSidebarItem[];
   icon?: ReactNode;
};
