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
        return <Footer style={{textAlign: 'center', backgroundColor: '#001529'}} className={"text-white margin-sm-top"}>
            <Row>
                <Col sm={8} xs={24}/>
                <Col sm={8} xs={24}>
                    <b>Interested? Subscribe to our mailing list! <Icon type={"mail"}/></b>
                    <Row className="margin-sm-top"/>
                    <SubscribeToMailingList/>
                </Col>
            </Row>

            <Row className={"margin-sm-top"}>
                <a href={"https://www.indiehackers.com/product/gitcom"} target="_blank" rel="noopener noreferrer">
                    <img
                        style={{width: "40px"}}
                        src={"https://www.indiehackers.com/images/logos/indie-hackers-logo__glyph--light.svg"}
                        alt={"IndieHackers logo"}
                    />
                </a>
                <a
                    className={"margin-sm-sides"}
                    href="https://www.producthunt.com/posts/gitcom?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-gitcom"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=181944&theme=dark"
                        alt="GitCom - Community-Driven open source marketplace | Product Hunt"
                        style={{width: "200px", height: "54px"}}
                    />
                </a>
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
