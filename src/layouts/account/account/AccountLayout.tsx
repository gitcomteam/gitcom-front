import React from 'react';
import FullPageWithSideBar from "../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import UserCard from "../../../components/entity/user/single/card/UserCard";

interface IProps {
}

interface IState {
}

class AccountLayout extends React.Component<IProps, IState> {
    render() {
        return <FullPageWithSideBar sidebarType={"home"}>
            <h3 className={"ant-typography"}>My account</h3>
            <UserCard me={true} user={window.App.authorizedUser}/>
        </FullPageWithSideBar>;
    }
}

export default AccountLayout;