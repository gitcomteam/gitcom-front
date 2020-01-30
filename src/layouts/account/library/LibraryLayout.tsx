import React from 'react';
import FullPageWithSideBar from "../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import {Row} from "antd";
import MyLibraryItems from "../../../components/entity/my_library/many/MyLibraryItems";
import AuthRedirect from "../../../components/auth/redirect/AuthRedirect";

class LibraryLayout extends React.Component {
    constructor(props: any) {
        document.title = "My library | GitCom - Community-Driven open source marketplace";
        super(props);
        this.state = {}
    }
    render() {
        return <FullPageWithSideBar sidebarType={"home"}>
            <AuthRedirect/>
            <div>
                <h3 className={"ant-typography"}>My library</h3>
                <p>Your monthly subscription will be distributed across those projects</p>

                <Row className="margin-md-vertical"/>

                <MyLibraryItems/>
            </div>
        </FullPageWithSideBar>;
    }
}

export default LibraryLayout;