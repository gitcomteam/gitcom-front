import React from "react";
import FullPageWithSideBar from "../../../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";
import {Icon} from "antd";
import { Redirect } from 'react-router';

interface IState {
    isLoaded: boolean,
    isRedirected: boolean,
    accessToken: string,
    redirectBlock: any
}

class LoginWithGitHubLayout extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoaded: false,
            isRedirected: false,
            accessToken: "",
            redirectBlock: null
        }
    }

    getAccessTokenFromUrl(url: string): string {
        try {
            let rawAccessToken = url.split('code=')[1];
            return rawAccessToken.split('&')[0];
        } catch (e) {
            console.error(e);
        }
        return "";
    }

    sendGitHubAccessToken(accessToken: string): void {
        window.App.apiClient.getGitHubAuthToken({
            code: accessToken
        })
            .then((result) =>
                this.processGetAuthTokenResponse(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetAuthTokenResponse(response: any) {
        let data = JSON.parse(response.bodyAsText).data;
        if (!data.token) {
            console.error("got empty token");
            return;
        }
        window.App.setApiToken(data.token);
        this.setState({
            isLoaded: true,
            isRedirected: true
        });
        setTimeout(() => {
            this.setState({
                redirectBlock: <Redirect to={"/home"}/>
            });
        }, 1000);
    }

    componentDidMount(): void {
        let accessToken = this.getAccessTokenFromUrl(window.location.href);
        this.sendGitHubAccessToken(accessToken);
    }

    render() {
        if (this.state.isRedirected) {
            return <FullPageWithSideBar sidebarType={"home"}>
                <div>
                    <h3 className={"ant-typography"}>You're logged in, redirecting ... </h3>
                    <br/>
                    <Icon type="loading" style={{fontSize: "2em"}}/>
                    {this.state.redirectBlock}
                </div>
            </FullPageWithSideBar>;
        }

        if (!this.state.isLoaded) {
            return <FullPageWithSideBar sidebarType={"home"}>
                <div>
                    <h3 className={"ant-typography"}>Trying to log in via GitHub ...</h3>
                    <br/>
                    <Icon type="loading" style={{fontSize: "2em"}}/>
                </div>
            </FullPageWithSideBar>;
        }

        return <FullPageWithSideBar sidebarType={"home"}>
            <h3 className={"ant-typography"}>Loading ...</h3>
        </FullPageWithSideBar>;
    }
}

export default LoginWithGitHubLayout;
