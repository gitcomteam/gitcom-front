import React from 'react';
import FullContainerPage from "../../components/layout/simple/fullpage/FullContainerPage";
import ProjectCardList from "../../components/entity/project/many/cards_list/ProjectCardList";
import {Button, Row} from "antd";

class IndexLayout extends React.Component {
    render() {
        return (
            <FullContainerPage>
                <h1 className={"ant-typography margin-sm"}>GitCom</h1>
                <h3 className={"ant-typography margin-sm"}>Community-Driven open source monetization platform</h3>

                <a href={"https://start.gitcom.org"} target="_blank" rel="noopener noreferrer">
                    <Button icon={"question"} type={"default"}>How it works?</Button>
                </a>

                <Row className="margin-lg-top"/>

                <ProjectCardList label={"Newest projects"} type={"newest"}/>
                <Row className="margin-lg-top"/>
                <ProjectCardList label={"Random projects"} type={"random"}/>
            </FullContainerPage>
        );
    }
}

export default IndexLayout;