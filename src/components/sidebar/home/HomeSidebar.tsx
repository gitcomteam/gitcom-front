import React from "react";
import {Layout, Menu, Icon} from "antd";
import {Link} from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;

class HomeSidebar extends React.Component {
    static getActiveMenuKeys(): string[] {
        switch (window.location.pathname) {
            case "/account":
                return ["sub1", "account"];
            case "/account/billing":
                return ["sub1", "billing"];
            case "/account/settings":
                return ["sub1", "settings"];
            case "/account/subscription":
                return ["sub1", "subscription"];

            case "/home/integrations":
                return ["integrations"];

            case "/account/library":
                return ["library"];
        }
        return [];
    }

    render() {
        return (
            <Sider>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={HomeSidebar.getActiveMenuKeys()}
                    defaultOpenKeys={HomeSidebar.getActiveMenuKeys()}
                    style={{height: '100%', borderRight: 0}}
                >
                    <Menu.Item key="library" className={"text-left"}>
                        <Link to={"/account/library"}><Icon type={"appstore"}/>My library</Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="user"/>Account</span>}
                        className={"text-left"}
                    >
                        <Menu.Item key="account" className={"text-left"}>
                            <Link to={"/account"}><Icon type="user"/>My account</Link>
                        </Menu.Item>
                        <Menu.Item key="billing" className={"text-left"}>
                            <Link to={"/account/billing"}><Icon type={"dollar"}/>Billing</Link>
                        </Menu.Item>
                        <Menu.Item key="subscription" className={"text-left"}>
                            <Link to={"/account/subscription"}><Icon type={"dollar"}/>Subscription</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="integrations" className={"text-left"}>
                        <Link to={"/home/integrations"}><Icon type={"github"}/>Integrations</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default HomeSidebar;