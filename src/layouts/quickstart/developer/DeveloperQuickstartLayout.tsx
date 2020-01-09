import React from "react";
import {Button, Card, Col, Icon, Row} from "antd";
import FullContainerPage from "../../../components/layout/simple/fullpage/FullContainerPage";

class DeveloperQuickstartLayout extends React.Component {
    render() {
        return <FullContainerPage>
            <Row>
                <Col lg={4} sm={3}/>
                <Col lg={16} md={18} xs={24}>
                    <Card>
                        <h3 className={"ant-typography"}>GitCom developer quickstart</h3>
                        <b>GitCom is a platform that can help you to monetize your open source projects</b>
                        <Row className={"margin-md-top"}/>
                        <a href={"https://start.gitcom.org"} target="_blank" rel="noopener noreferrer">
                            <Button icon={"question"} type={"default"}>How it works?</Button>
                        </a>
                        <br/>
                        <Row className={"margin-md-top"}/>
                        <div className={"text-left margin-md-top"}>
                            <b>Here are 4 steps that can help you get started <Icon type="smile" style={{fontSize: "1.2em"}}/></b>
                            <p>
                                1. <a href={"/login"} target="_blank" rel="noopener noreferrer">Sign in</a> into your
                                account
                                <br/>
                                2. Go to <a href={"/home/integrations"} target="_blank"
                                            rel="noopener noreferrer">integrations </a>
                                page and connect your GitHub or GitLab account
                                <div className={"flex-center padding-md"}>
                                    <div style={{
                                        background: "url(/img/quickstart/screenshot_1.jpg)",
                                        backgroundSize: "cover",
                                        width: "50%",
                                        height: "150px"
                                    }} className={"image-rounded"}/>
                                </div>
                                3. Select repositories that you would like to monetize and import them into the platform
                                <div className={"flex-center padding-md"}>
                                    <div style={{
                                        background: "url(/img/quickstart/screenshot_2.jpg)",
                                        backgroundSize: "cover",
                                        width: "50%",
                                        height: "150px"
                                    }} className={"image-rounded"}/>
                                </div>
                                4. That's it! Thank you. <Icon type="smile" style={{fontSize: "1.2em"}}/> We'll reach out to you when one of your projects will receive
                                their first donation
                                <br/>
                                <Row className={"margin-md-top"}/>
                                In the meantime, you can
                                <a href={"https://discord.gg/bVZxFhH"} target="_blank" rel="noopener noreferrer"> join our Discord server </a>
                                to be able to discuss platform upcoming features and improvement ideas
                            </p>
                        </div>
                        <b>How funding works</b>
                    </Card>
                </Col>
            </Row>
        </FullContainerPage>
    }
}

export default DeveloperQuickstartLayout;