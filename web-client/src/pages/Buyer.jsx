import React from "react";
import {
  ShoppingCartOutlined,
  DropboxOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { BuyerCart } from "../components";

const {Content, Sider } = Layout;

const items2 = [
  {
    key: "opt1",
    icon: React.createElement(ShoppingCartOutlined),
    label: "Cart",
  },
  {
    key: "opt2",
    icon: React.createElement(DropboxOutlined),
    label: "Orders",
  },
  {
    key: "opt3",
    icon: React.createElement(MessageOutlined),
    label: "Messages",
  },
];

const Buyer = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="my-10">
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            style={{
              padding: 24,
              marginTop: 25,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
           <BuyerCart/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Buyer;
