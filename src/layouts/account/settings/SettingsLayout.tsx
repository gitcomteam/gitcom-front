import React from 'react';
import FullPageWithSideBar from "../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import AuthRedirect from "../../../components/auth/redirect/AuthRedirect";

class SettingsLayout extends React.Component {
    constructor(props: any) {
        document.title = "Settings | GitCom - Community-Driven open source marketplace";
        super(props);
        this.state = {}
    }

    render() {
        return <FullPageWithSideBar sidebarType={"home"}>
            <AuthRedirect/>
            <div>
                Settings layout
            </div>
        </FullPageWithSideBar>;
    }
}

export default SettingsLayout;