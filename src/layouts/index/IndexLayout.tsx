import React from 'react';
import FullContainerPage from "../../components/layout/simple/fullpage/FullContainerPage";
import ProjectCardList from "../../components/entity/project/many/cards_list/ProjectCardList";
import {Button, Card, Col, Row, Typography} from "antd";
import FastAuth from "../../components/auth/block/FastAuth/FastAuth";

const { Title } = Typography;

class IndexLayout extends React.Component {
    render() {
        return (
            <FullContainerPage>
                <Row className="margin-lg-top"/>

                <Row className="margin-md-vertical" style={{
                    background: "url(/img/bg/index.jpg)",
                    backgroundSize: "cover",
                    borderRadius: "5px"
                }}>
                    <Col
                        sm={12} xs={24}
                        style={{
                            minHeight: "50vh",
                            padding: "25px",
                        }}
                        className="text-white"
                    >
                    <div>
                            <h1 className={"ant-typography margin-sm text-white"}>GitCom</h1>
                            <h4 className={"ant-typography margin-sm text-white"}>Community-Driven open source marketplace</h4>
                            <p className={"text-left"}>
                                GitCom helps users <i>easily support open source and get rewards in return</i> and
                                helping developers to <i> get financial support for their open source work</i>
                            </p>
                            <a href={"https://start.gitcom.org"} target="_blank" rel="noopener noreferrer">
                                <Button icon={"question"} type={"default"}>How it works?</Button>
                            </a>
                        </div>
                    </Col>
                    <Col
                        sm={12} xs={24}
                        style={{
                            minHeight: "50vh",
                            padding: "40px"
                        }}
                    >
                        <Card>
                            <Title level={4}>Sign in and join our growing community!</Title>
                            <p>It's just a few clicks away!</p>
                            <div className="padding-md">
                                <FastAuth/>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row className={"margin-lg-top"}/>

                <ProjectCardList label={"Newest projects"} type={"newest"}/>
                <Row className="margin-lg-top"/>
                <ProjectCardList label={"Random projects"} type={"random"}/>
            </FullContainerPage>
        );
    }
}

export default IndexLayout;