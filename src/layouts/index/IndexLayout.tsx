import React from 'react';
import FullContainerPage from "../../components/layout/simple/fullpage/FullContainerPage";
import ProjectCardList from "../../components/entity/project/many/cards_list/ProjectCardList";
import {Button, Card, Col, Divider, Row, Typography} from "antd";
import FastAuth from "../../components/auth/block/FastAuth/FastAuth";
import {Link} from "react-router-dom";
import ProjectPosts from "../../components/entity/project_post/many/ProjectPosts";

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
                <Row>
                    <h2 className={"ant-typography"}>How it works?</h2>
                </Row>
                <Row>
                    <Col sm={6} xs={12}>
                        <h3 className={"ant-typography margin-lg-top"}>For users:</h3>
                    </Col>
                    <Col sm={6} xs={12} className={"padding-sm"}>
                        <img style={{width: "60px"}} src="/img/emoji/openmoji/robot.svg" alt={"robot emoji"}/>
                        <h4 className={"ant-typography"}>1. Sign up</h4>
                    </Col>
                    <Col sm={6} xs={12} className={"padding-sm"}>
                        <img style={{width: "60px"}} src="/img/emoji/openmoji/sparkling-heart.svg" alt={"sparkling heart emoji"}/>
                        <h4 className={"ant-typography"}>2. Select projects that you'd like and pay any amount each month</h4>
                    </Col>
                    <Col sm={6} xs={12} className={"padding-sm"}>
                        <img style={{width: "60px"}} src="/img/emoji/openmoji/gift.svg" alt={"hand horns emoji"}/>
                        <h4 className={"ant-typography"}>3. Support open source and get rewards in return</h4>
                    </Col>
                </Row>
                <Row>
                    <Divider/>
                </Row>
                <Row>
                    <Col sm={6} xs={12}>
                        <h3 className={"ant-typography margin-lg-top"}>For developers:</h3>
                    </Col>
                    <Col sm={6} xs={12} className={"padding-sm"}>
                        <img style={{width: "60px"}} src="/img/emoji/openmoji/writing-hand.svg" alt={"robot emoji"}/>
                        <h4 className={"ant-typography"}>1. Sign up</h4>
                    </Col>
                    <Col sm={6} xs={12} className={"padding-sm"}>
                        <img style={{width: "60px"}} src="/img/emoji/openmoji/swipe-up.svg" alt={"sparkling heart emoji"}/>
                        <h4 className={"ant-typography"}>2. Import your projects and set up pricing plans</h4>
                    </Col>
                    <Col sm={6} xs={12} className={"padding-sm"}>
                        <img style={{width: "60px"}} src="/img/emoji/openmoji/money-mouth-face.svg" alt={"money mouth face"}/>
                        <h4 className={"ant-typography"}>3. Start earning with open source</h4>
                    </Col>
                </Row>
                <Row>
                    <Link to={"/login"}>
                        <Button icon={"rocket"} type={"primary"}>Get started, it's free</Button>
                    </Link>
                </Row>

                <Row className={"margin-lg-top"}/>
                <Row>
                    <Col sm={16} xs={24}>
                        <ProjectCardList label={"Newest projects"} type={"newest"}/>
                        <Row className="margin-lg-top"/>
                        <ProjectCardList label={"Random projects"} type={"random"}/>
                    </Col>
                    <Col sm={8} xs={24}>
                        <h4 className={"ant-typography"}>Latest updates</h4>
                        <ProjectPosts/>
                    </Col>
                </Row>
            </FullContainerPage>
        );
    }
}

export default IndexLayout;