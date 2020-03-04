import React from "react";
import styles from './styles.module.css';
import AppLayout from "../../../../layouts/app/AppLayout";
import {Col, Layout, Row, Card} from "antd";
import HomeSidebar from "../../../sidebar/home/HomeSidebar";
import ProjectViewSidebar from "../../../sidebar/entity/project/view/ProjectViewSidebar";
import ExploreSidebar from "../../../sidebar/explore/default/ExploreSidebar";

const { Sider, Content} = Layout;


interface IProps {
    sidebarType: string,
    customSidebar: any
}

interface IState {
}

class FullPageWithSideBar extends React.Component<IProps, IState> {
    public static defaultProps = {
        customSidebar: null
    };

    getSidebar() {
        if (this.props.customSidebar) {
            return this.props.customSidebar;
        }
        switch (this.props.sidebarType) {
            case "home": return <HomeSidebar/>;
            case "project_view": return <ProjectViewSidebar/>;
            case "explore": return <ExploreSidebar/>;
        }
        return <Sider/>
    }

    render() {
        return (
            <AppLayout>
                <Row type={"flex"} justify={"center"}>
                    <Col xxl={18} xs={24}>
                        <Content className={styles.root}>
                            <Layout className={styles.flexColMobile}>
                                <Row className="full-width">
                                    <Col md={6} xs={24}>
                                        <Card style={{height: "100%"}} className={
                                            "text-center sm-desktop-horizontal-margin flex-center desktop-zero-height"
                                        }>
                                            {this.getSidebar()}
                                        </Card>
                                    </Col>
                                    <Col md={18} xs={24}>
                                        <Card className={"full-width sm-desktop-horizontal-margin tst323"}>
                                            {this.props.children}
                                        </Card>
                                    </Col>
                                </Row>
                            </Layout>
                        </Content>
                    </Col>
                </Row>
            </AppLayout>
        );
    }
}

export default FullPageWithSideBar;