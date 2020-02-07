import React from "react";
import {Layout, Menu, Icon} from "antd";
import {Link} from "react-router-dom";

const { Sider } = Layout;

interface IProps {
}

interface IState {
}

class ProjectViewSidebar extends React.Component<IProps, IState> {
    static getActiveMenuKeys(): string[] {
        if (window.location.pathname.includes('/pricing')) return ["pricing"];
        if (window.location.pathname.includes('/cards')) return ["cards"];
        return ["home"];
    }

    getPath() {
        let path = window.location.pathname.split("/");
        return `/${path[1]}/${path[2]}`;
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
                    <Menu.Item key="home" className={"text-left"}>
                        <Link to={this.getPath()}><Icon type={"home"}/>Project</Link>
                    </Menu.Item>
                    <Menu.Item key="pricing" className={"text-left"}>
                        <Link to={`${this.getPath()}/pricing`}><Icon type={"dollar"}/>Pricing</Link>
                    </Menu.Item>
                    <Menu.Item key="cards" className={"text-left"}>
                        <Link to={`${this.getPath()}/cards`}><Icon type={"credit-card"}/>Cards</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default ProjectViewSidebar;