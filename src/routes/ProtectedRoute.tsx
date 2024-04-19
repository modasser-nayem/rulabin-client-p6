import { ReactNode } from "react";
import { useAppSelector } from "../redux/hook";
import { Navigate } from "react-router-dom";
import { TUserRole } from "../types/user.types";

type TProtectedRouteProps = {
   children: ReactNode;
   role?: TUserRole;
};

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
   const user = useAppSelector((state) => state.auth.user);

   if (!user) {
      return (
         <Navigate
            to={"/login"}
            replace={true}
         />
      );
   }

   if (role && role !== user.role) {
      return <Navigate to={user.role === "customer" ? "/" : `/${user.role}`} />;
   }

   return children;
};

export default ProtectedRoute;
