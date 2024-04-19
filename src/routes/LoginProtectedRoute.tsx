import { ReactNode } from "react";
import { useAppSelector } from "../redux/hook";
import { Navigate } from "react-router-dom";

const LoginProtectedRoute = ({ children }: { children: ReactNode }) => {
   const user = useAppSelector((state) => state.auth.user);

   if (!user) {
      return children;
   }

   return <Navigate to={user.role === "customer" ? "/" : `/${user.role}`} />;
};

export default LoginProtectedRoute;
