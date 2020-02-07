import React from "react";
import FullPageWithSideBar from "../../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import {Col, Icon, notification, Row} from "antd";
import {handleApiError} from "../../../../classes/notification/errorHandler/errorHandler";
import ExternalRepoCard from "../../../../components/external/external_repo/card/ExternalRepoCard";

interface IProps {
    match: {
        params: {
            serviceType: string
        }
    }
}

interface IState {
    isLoaded: boolean,
    serviceName: string,
    repositories: any
}

class ExternalRepoLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            serviceName: "",
            repositories: []
        };
    }

    getReposRequest() {
        window.App.apiClient.getMeExternalRepositories(window.App.apiToken)
            .then((result) =>
                this.processGetReposRequest(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetReposRequest(response: any) {
        let repositories = JSON.parse(response.bodyAsText).data.repositories;

        repositories = repositories.filter((item: any) => {
            return item.service_type === this.state.serviceName
        });

        this.setState({
            isLoaded: true,
            repositories: repositories
        });
    }

    setServiceName(serviceType: string) {
        let serviceName = serviceType === "github" ? "GitHub" : "";
        serviceName = serviceType === "gitlab" ? "GitLab" : serviceName;
        this.setState({serviceName: serviceName});
    }

    componentDidMount(): void {
        let serviceType = this.props.match.params.serviceType;
        if (serviceType !== "github" && serviceType !== "gitlab") {
            notification['error']({
                message: 'Unknown service error',
                description: ''
            });
            return;
        }
        this.setServiceName(serviceType);
        this.getReposRequest();
    }

    render() {
        return <FullPageWithSideBar sidebarType={"home"}>
            <h2 className={"ant-typography"}>My {this.state.serviceName} repositories</h2>

            {!this.state.isLoaded ? <Icon type="loading" style={{fontSize: "2em"}}/> : null}

            <Row type={"flex"}>
                {this.state.repositories.map((item: any, i: number) => {
                    return <Col key={i} md={12} xs={24} className="padding-sm">
                        <ExternalRepoCard repo={{
                            name: item.full_name,
                            description: item.description,
                            serviceType: item.service_type,
                            originId: item.origin_id
                        }}/>
                    </Col>;
                })}
            </Row>
        </FullPageWithSideBar>;
    }
}

export default ExternalRepoLayout;