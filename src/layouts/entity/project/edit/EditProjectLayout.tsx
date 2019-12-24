import React from "react";
import {handleApiError} from "../../../../classes/notification/errorHandler/errorHandler";
import {ProjectModel} from "../../../../client/bindings";
import FullPageWithSideBar from "../../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import {Button, Col, Icon, Input, notification, Row} from "antd";
import { Redirect } from "react-router";

interface IProps {
    match: {
        params: {
            owner: string,
            alias: string
        }
    }
}

interface IState {
    isLoaded: boolean,
    project: ProjectModel|null,
    updateSent: boolean,
    redirect: boolean
}

class EditProjectLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            project: null,

            updateSent: false,
            redirect: false
        };
    }

    componentDidMount(): void {
        this.getProjectInfo();
    }

    getProjectFullName() {
        return this.props.match.params.owner + "/" + this.props.match.params.alias;
    }

    getProjectInfo(): void {
        window.App.apiClient.getProjectByAlias(this.props.match.params.owner, this.props.match.params.alias)
            .then((result) =>
                this.processGetProjectInfo(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetProjectInfo(response: any) {
        let json = JSON.parse(response.bodyAsText);

        this.setState({
            isLoaded: true,
            project: json.data.project
        });

        if (this.state.updateSent) {
            notification['success']({
                message: 'Project was successfully updated',
                description: ''
            });
            setTimeout(() => {
                this.setState({redirect: true});
            }, 500);
        }
    }

    updateProject() {
        let project = this.state.project!;
        window.App.apiClient.editProject(window.App.apiToken, project.guid!, {
            description: project.description
        })
            .then((result) =>
                this.processGetProjectInfo(result._response))
            .catch((error) => handleApiError(error.response));
        this.setState({
            updateSent: true
        });
    }

    render() {
        if (!this.state.isLoaded || !this.state.project) {
            return <FullPageWithSideBar sidebarType={"project"}>
                <h3 className={"ant-typography"}>Loading project info</h3>
                <Icon type="loading" style={{fontSize: "2em"}}/>
            </FullPageWithSideBar>;
        }

        let project: ProjectModel = this.state.project;

        if (this.state.project && this.state.redirect) {
            return <Redirect to={"/" + project.base_uri!}/>;
        }

        return <FullPageWithSideBar sidebarType={"project_view"}>
            <h2 className={"ant-typography"}>{project.name}</h2>
            <Row>
                <Col md={6} xs={24}/>
                <Col md={12} xs={24}>
                    <Row className="display-flex">
                        <h4 className={"ant-typography"}>Description</h4>
                        <div className="margin-sm-sides"/>
                        <Input
                            value={project.description}
                            onChange={(e) => {
                                project.description = e.target.value;
                                this.setState({
                                    project: project
                                });
                            }}
                        />
                    </Row>

                    <Row className="margin-md-top">
                        <Button
                            type={"primary"}
                            icon={"edit"}
                            onClick={this.updateProject.bind(this)}
                        >Update</Button>
                    </Row>
                </Col>
            </Row>
        </FullPageWithSideBar>;
    }
}

export default EditProjectLayout;