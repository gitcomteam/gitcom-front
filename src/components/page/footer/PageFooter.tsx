import React from "react";
import {Col, Icon, Layout, Row} from "antd";
import SubscribeToMailingList from "../../action/subscription/SubscribeToMailingList/SubscribeToMailingList";

const { Footer } = Layout;

interface IProps {
}

interface IState {
}

class PageFooter extends React.Component<IProps, IState> {
    render() {
        return <Footer style={{textAlign: 'center', backgroundColor: '#001529'}} className={"text-white"}>
            <Row>
                <Col sm={8} xs={24}/>
                <Col sm={8} xs={24}>
                    <b>Interested? Subscribe to our mailing list!</b>
                    <Row className="margin-sm-top"/>
                    <SubscribeToMailingList/>
                </Col>
            </Row>

            <Row className="margin-md-top">
                Made with <Icon type={"heart"}/> and <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://ant.design/"}><Icon type={"ant-design"}/>Ant Design</a>
            </Row>

            <Row className="margin-sm-top">
                GitCom <Icon type={"copyright"}/> 2019-2020
            </Row>
        </Footer>
    }
}

export default PageFooter;