import React from 'react';
import FullPageWithSideBar from "../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import {Link} from "react-router-dom";
import AuthRedirect from "../../../components/auth/redirect/AuthRedirect";

interface IProps {
}

interface IState {
}

class HomeMainLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return <FullPageWithSideBar sidebarType={"home"}>
            <div>
                <AuthRedirect/>
                <h2 className={"ant-typography"}>Home layout</h2>
                <b>Welcome to the GitCom platform</b>
                <div className="text-left">
                    <b>If you're a user:</b>
                    <p>
                        Add projects that you like to your library, then your monthly subscription will be distributed
                        across your favorite projects.
                    </p>

                    <br/>

                    <b>If you're a developer:</b>
                    <p>
                        Go to <Link to={"/home/integrations"}>integrations</Link> and connect your GitHub or GitLab account
                        then you can import your projects and set up project boards and pricing plans
                        (can be found on project page)!
                    </p>
                </div>
            </div>
        </FullPageWithSideBar>;
    }
}

export default HomeMainLayout;