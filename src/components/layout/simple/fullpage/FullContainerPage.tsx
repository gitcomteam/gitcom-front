import React from "react";
import styles from './styles.module.css';
import {Col, Layout, Row} from "antd";
import AppLayout from "../../../../layouts/app/AppLayout";

const { Content } = Layout;

class FullContainerPage extends React.Component {
    render() {
        return (
            <AppLayout>
                <Row type={"flex"} justify={"center"}>
                    <Col xxl={16} xl={24} xs={24}>
                        <Content className={styles.root}>
                            {this.props.children}
                        </Content>
                    </Col>
                </Row>
            </AppLayout>
        );
    }
}

export default FullContainerPage;