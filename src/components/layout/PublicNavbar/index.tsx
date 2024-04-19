import { NavLink, Link } from "react-router-dom";
import "./style.css";
import { Avatar, Dropdown, MenuProps } from "antd";
import { PiUserCircleDuotone } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { LuUser2 } from "react-icons/lu";
import { logOutUser } from "../../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { FiLogIn } from "react-icons/fi";

const PublicNavbar = () => {
   const dispatch = useAppDispatch();
   const user = useAppSelector((state) => state.auth.user);

   const menuItems: MenuProps["items"] = [
      {
         label: "Profile",
         key: "1",
         icon: <PiUserCircleDuotone size={20} />,
         style: {
            fontSize: "16px",
            padding: "0.6rem 1.2rem",
         },
      },
      {
         label: "Logout",
         key: "2",
         icon: <MdLogout size={20} />,
         style: {
            fontSize: "16px",
            padding: "0.6rem 1.2rem",
         },
         danger: true,
         onClick: () => {
            dispatch(logOutUser());
            toast.success("Successfully Logout");
         },
      },
   ];

   return (
      <div className="navbar">
         <div>
            <Link
               className="brand-logo"
               to="/"
            >
               Rulabin
            </Link>
         </div>
         <div className="nav-right">
            <div className="nav-menu">
               <NavLink
                  className="nav-link"
                  to="/"
               >
                  Home
               </NavLink>
               <NavLink
                  className="nav-link"
                  to="/shop"
               >
                  Products
               </NavLink>
               <NavLink
                  className="nav-link"
                  to="/contact"
               >
                  Products
               </NavLink>
            </div>
            {user ? (
               <Dropdown menu={{ items: menuItems }}>
                  <Avatar
                     style={{
                        backgroundColor: "#87d068",
                        marginRight: "10px",
                        cursor: "pointer",
                     }}
                     icon={<LuUser2 />}
                  />
               </Dropdown>
            ) : (
               <Link to="/login">
                  <FiLogIn
                     title="Login"
                     size={20}
                  />
               </Link>
            )}
         </div>
      </div>
   );
};

export default PublicNavbar;
