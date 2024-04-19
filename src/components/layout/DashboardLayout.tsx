import { useState } from "react";
import {
   MenuFoldOutlined,
   MenuUnfoldOutlined,
   UserOutlined,
} from "@ant-design/icons";
import { Layout, Button, theme, Avatar, Dropdown, MenuProps } from "antd";
import { MdLogout } from "react-icons/md";
import { PiUserCircleDuotone } from "react-icons/pi";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";
import { sidebarItemsGenerator } from "../../utils/sidebarItemGenerator";
import { adminRouteItems } from "../../routes/admin.routes";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logOutUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { sellerRouteItems } from "../../routes/seller.routes";
import { TSidebarItem } from "../../types/routes.types";

const { Header, Content } = Layout;

const DashboardLayout = () => {
   const dispatch = useAppDispatch();
   const [collapsed, setCollapsed] = useState(false);
   const {
      token: { colorBgContainer },
   } = theme.useToken();

   let sidebarItems: TSidebarItem[] = [];

   const user = useAppSelector((state) => state.auth.user);

   switch (user?.role) {
      case "admin":
         sidebarItems = sidebarItemsGenerator({
            routePrefix: "/admin",
            routeItems: adminRouteItems,
         });
         break;
      case "seller":
         sidebarItems = sidebarItemsGenerator({
            routePrefix: "/seller",
            routeItems: sellerRouteItems,
         });
         break;
   }

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
      <Layout>
         <DashboardSidebar
            collapsed={collapsed}
            items={sidebarItems}
         />
         <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
            <Header
               style={{
                  padding: 0,
                  background: colorBgContainer,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
               }}
            >
               <Button
                  type="text"
                  icon={
                     collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                     fontSize: "16px",
                     width: 64,
                     height: 64,
                  }}
               />
               <Dropdown menu={{ items: menuItems }}>
                  <Avatar
                     style={{
                        backgroundColor: "#87d068",
                        marginRight: "10px",
                        cursor: "pointer",
                     }}
                     icon={<UserOutlined />}
                  />
               </Dropdown>
            </Header>
            <Content
               style={{
                  minHeight: "90vh",
               }}
            >
               <Outlet />
            </Content>
         </Layout>
      </Layout>
   );
};

export default DashboardLayout;
