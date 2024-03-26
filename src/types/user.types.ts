export type TUserRole = "customer" | "seller" | "admin";
export type TAuthUser = {
   id: string;
   role: string;
   iat: number;
   exp: number;
};
