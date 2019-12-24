import React from 'react';
import FullPageWithSideBar from "../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import {Button, Divider, Icon, Row} from "antd";
import {Link} from "react-router-dom";
import {handleApiError} from "../../../classes/notification/errorHandler/errorHandler";
import ConnectButton from "../../../components/external/auth/connectButton/ConnectButton";

interface IProps {
}

interface IState {
    isLoaded: boolean,
    integrations: {
        github: {
            connected: boolean
            login_link: string,
            user: any | null
        },
        gitlab: {
            connected: boolean
            login_link: string,
            user: any | null
        }
    }
}

class HomeIntegrationsLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            integrations: {
                github: {
                    connected: false,
                    login_link: "",
                    user: null
                },
                gitlab: {
                    connected: false,
                    login_link: "",
                    user: null
                }
            }
        }
    }

    componentDidMount(): void {
        window.App.apiClient.getMyIntegrationsStatus(window.App.apiToken)
            .then((result) =>
                this.processGetIntegrationsResponse(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetIntegrationsResponse(response: any) {
        let gotIntegrations = JSON.parse(response.bodyAsText).data.integrations;

        let currentState: IState = this.state;
        currentState = Object.assign(currentState, this.state);

        currentState.isLoaded = true;
        currentState.integrations.github.connected = gotIntegrations.github.connected;
        currentState.integrations.gitlab.connected = gotIntegrations.gitlab.connected;

        currentState.integrations.github.user = gotIntegrations.github.user;
        currentState.integrations.gitlab.user = gotIntegrations.gitlab.user;

        this.setState(currentState);
    }

    isConnected(service: string): boolean {
        if (service !== "github" && service !== "gitlab") {
            return false;
        }
        return this.state.integrations[service].connected;
    }

    getConnectedLabel(service: string) {
        if (service !== "github" && service !== "gitlab") {
            return null;
        }
        let integrationData = this.state.integrations[service];
        if (!integrationData.user) {
            return this.isConnected(service) ? "connected" : "not connected";
        }

        return <div className="inline">
            connected as <a href={`https://${service}.com/${integrationData.user.login}`}>@{integrationData.user.login}</a>
        </div>
    }

    render() {
        if (!this.state.isLoaded) {
            return <FullPageWithSideBar sidebarType={"home"}>
                <div>
                    <h2 className={"ant-typography"}>Integrations</h2>
                    <br/>
                    <Icon type="loading" style={{fontSize: "2em"}}/>
                </div>
            </FullPageWithSideBar>;
        }

        return <FullPageWithSideBar sidebarType={"home"}>
            <div>
                <h2 className={"ant-typography"}>Integrations</h2>

                <div className="text-left">
                    <h3 className={"ant-typography"}>GitHub</h3>
                    <b>Status: {this.getConnectedLabel("github")}</b>
                    <Row className={"margin-md-top"}/>
                    {
                        this.isConnected("github") ?
                            <Link to={"/external/github/repositories"}>
                                <Button type={"primary"}>Browse repositories</Button>
                            </Link> :
                            <ConnectButton service={"github"}/>
                    }

                    <Divider/>

                    <h3 className={"ant-typography"}>GitLab</h3>
                    <b>Status: {this.getConnectedLabel("gitlab")}</b>
                    <Row className={"margin-md-top"}/>
                    {
                        this.isConnected("gitlab") ?
                            <Link to={"/external/gitlab/repositories"}>
                                <Button type={"primary"}>Browse repositories</Button>
                            </Link> :
                            <ConnectButton service={"gitlab"}/>
                    }
                </div>
            </div>
        </FullPageWithSideBar>;
    }
}

export default HomeIntegrationsLayout;