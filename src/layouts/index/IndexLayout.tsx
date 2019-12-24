import React from 'react';
import FullContainerPage from "../../components/layout/simple/fullpage/FullContainerPage";
import ProjectCardList from "../../components/entity/project/many/cards_list/ProjectCardList";
import {Button, Row} from "antd";

class IndexLayout extends React.Component {
    render() {
        return (
            <FullContainerPage>
                <h1 className={"ant-typography margin-sm"}>GitCom</h1>
                <h3 className={"ant-typography margin-sm"}>New look at open source and its monetization</h3>
                <p className="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <a href={"https://info.gitcom.org"}>
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