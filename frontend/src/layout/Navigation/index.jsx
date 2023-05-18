import React, { useState } from "react";
import { Drawer, Button } from "antd";

import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Navigation() {
  const [collapsed, setCollapsed] = useState(false);
  let key = window.location.href.split("/")[3];
  
  const location = useLocation();

  const [defaultKey, setDefault] = useState(["1"]);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          zIndex: 1000,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']}
            selectedKeys={[location.pathname]}>
          <Menu.Item key="/" icon={<DashboardOutlined />}>
            <Link to="/" />
            Home Page
          </Menu.Item>
          <Menu.Item key="/tags" icon={<FileTextOutlined />}>
            <Link to="/tags">Tags</Link>
          </Menu.Item>
          <Menu.Item key="/posts" icon={<FileTextOutlined />}>
            <Link to="/posts" />
            Posts
          </Menu.Item>
          <Menu.Item key="/users" icon={<UserOutlined />}>
            <Link to="/users" />
            Users
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}
export default Navigation;
