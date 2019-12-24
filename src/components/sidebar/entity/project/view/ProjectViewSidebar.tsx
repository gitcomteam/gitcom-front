import React from "react";
import {Layout, Menu, Icon} from "antd";
import {Link} from "react-router-dom";

const { Sider } = Layout;

class ProjectViewSidebar extends React.Component {
    static getActiveMenuKeys(): string[] {
        switch (window.location.pathname) {
            case "/home":
                return ["home"];
            case "/account":
                return ["sub1", "account"];
        }
        return [];
    }

    render() {
        return (
            <Sider>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={ProjectViewSidebar.getActiveMenuKeys()}
                    defaultOpenKeys={ProjectViewSidebar.getActiveMenuKeys()}
                    style={{height: '100%', borderRight: 0}}
                >
                    <Menu.Item key="team" className={"text-left"}>
                        <Link to={"team"}><Icon type={"team"}/>Team</Link>
                    </Menu.Item>
                    <Menu.Item key="settings" className={"text-left"}>
                        <Link to={"settings"}><Icon type={"setting"}/>Settings</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default ProjectViewSidebar;