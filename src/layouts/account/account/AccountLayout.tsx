import React from 'react';
import FullPageWithSideBar from "../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import UserCard from "../../../components/entity/user/single/card/UserCard";
import ProjectCardList from "../../../components/entity/project/many/cards_list/ProjectCardList";
import {Button, Row} from "antd";
import {Link} from "react-router-dom";
import AuthRedirect from "../../../components/auth/redirect/AuthRedirect";

interface IProps {}

interface IState {}

class AccountLayout extends React.Component<IProps, IState> {
    componentDidMount(): void {
        setTimeout(() => {this.setState({})}, 1500);
    }

    render() {
        return <FullPageWithSideBar sidebarType={"home"}>
            <AuthRedirect/>
            <h3 className={"ant-typography"}>My account</h3>
            <UserCard me={true} user={window.App.authorizedUser}/>
            <Row className={"margin-md-top"}/>
            {
                window.App.authorizedUser ?
                    <div>
                        <ProjectCardList label={"My projects"} type={"user"} userGuid={window.App.authorizedUser!.guid!}/>
                        <Link to={"/home/integrations"}>
                            <Button icon={"plus"} type={"primary"}>Import projects</Button>
                        </Link>
                    </div>
                    : null
            }
        </FullPageWithSideBar>;
    }
}

export default AccountLayout;