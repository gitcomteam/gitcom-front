import React from "react";
import {Icon, Menu} from "antd";
import {Link} from "react-router-dom";
import Sider from "antd/es/layout/Sider";

class ExploreSidebar extends React.Component {
    static getActiveMenuKeys(): string[] {
        if (window.location.pathname.includes('/explore/projects')) return ["projects"];
        if (window.location.pathname.includes('/explore/cards')) return ["cards"];
        return ["home"];
    }

    render() {
        return (
            <Sider>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={ExploreSidebar.getActiveMenuKeys()}
                    defaultOpenKeys={ExploreSidebar.getActiveMenuKeys()}
                    style={{height: '100%', borderRight: 0}}
                >
                    <Menu.Item>
                        <b>Explore</b>
                    </Menu.Item>
                    <Menu.Item key="projects" className={"text-left"}>
                        <Link to={"/explore/projects"}><Icon type={"home"}/>Projects</Link>
                    </Menu.Item>
                    <Menu.Item key="cards" className={"text-left"}>
                        <Link to={"/explore/cards"}><Icon type={"credit-card"}/>Cards</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default ExploreSidebar;
