import { Layout, Menu } from "antd";
import { TSidebarItem } from "../../types/routes.types";

const { Sider } = Layout;

const DashboardSidebar = ({
   collapsed,
   items,
}: {
   collapsed: boolean;
   items: TSidebarItem[];
}) => {
   return (
      <Sider
         collapsible
         collapsed={collapsed}
         style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
         }}
         // breakpoint="lg"
         // collapsedWidth="0"
         // onBreakpoint={(broken) => {
         //    console.log(broken);
         // }}
         // onCollapse={(collapsed, type) => {
         //    console.log(collapsed, type);
         // }}
      >
         <div className="demo-logo-vertical" />
         <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
         />
      </Sider>
   );
};

export default DashboardSidebar;
