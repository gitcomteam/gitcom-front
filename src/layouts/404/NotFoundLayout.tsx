import React from "react";
import FullContainerPage from "../../components/layout/simple/fullpage/FullContainerPage";
import {Button, Card, Col, Icon, Row} from "antd";
import styles from "../auth/login/styles.module.css";
import {Link} from "react-router-dom";

interface IProps {
}

interface IState {
}

class NotFoundLayout extends React.Component<IProps, IState> {
    render() {
        return (
            <FullContainerPage>
                <Row type={"flex"} justify={"center"}>
                    <Col xxl={8} xl={8} md={12} xs={24} className={styles.verticalCenter}>
                        <Card>
                            <h3 className={"ant-typography"}>Page not found <Icon type={"robot"}/></h3>
                            <Link to={window.App.isAuthorized() ? "/home" : "/"}>
                                <Button type={"primary"}>
                                    {window.App.isAuthorized() ? "Go to home" : "Go to index page"}
                                </Button>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </FullContainerPage>
        );
    }
}

export default NotFoundLayout;
