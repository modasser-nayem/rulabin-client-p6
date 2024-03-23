import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";
import { sidebarItemsGenerator } from "../../utils/sidebarItemGenerator";
import { adminRouteItems } from "../../routes/admin.routes";

const { Header, Content } = Layout;

const DashboardLayout = () => {
   const [collapsed, setCollapsed] = useState(false);
   const {
      token: { colorBgContainer },
   } = theme.useToken();

   const sidebarItems = sidebarItemsGenerator({
      routePrefix: "/admin",
      routeItems: adminRouteItems,
   });

   return (
      <Layout>
         <DashboardSidebar
            collapsed={collapsed}
            items={sidebarItems}
         />
         <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
            <Header style={{ padding: 0, background: colorBgContainer }}>
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
            </Header>
            <Content
               style={{
                  //   margin: "24px 16px 0",
                  //   overflow: "initial",
                  border: "1px solid",
               }}
            >
               <Outlet />
            </Content>
         </Layout>
      </Layout>
   );
};

export default DashboardLayout;
