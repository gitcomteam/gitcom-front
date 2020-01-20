import React from "react";
import {Layout, Menu, Icon} from "antd";
import {Link} from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;

class HomeSidebar extends React.Component {
    static getActiveMenuKeys(): string[] {
        switch (window.location.pathname) {
            case "/account":
                return ["account_sub", "account"];
            case "/account/billing":
                return ["account_sub", "billing"];
            case "/account/settings":
                return ["account_sub", "settings"];
            case "/account/subscription":
                return ["account_sub", "subscription"];
            case "/account/withdrawals":
                return ["account_sub", "withdrawals"];

            case "/home/integrations":
                return ["integrations"];

            case "/home":
                return ["home"];
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
                    <Menu.Item key="home" className={"text-left"}>
                        <Link to={"/home"}><Icon type={"home"}/>Home</Link>
                    </Menu.Item>
                    <SubMenu
                        key="account_sub"
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
                        <Menu.Item key="withdrawals" className={"text-left"}>
                            <Link to={"/account/withdrawals"}><Icon type={"dollar"}/>Withdrawals</Link>
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