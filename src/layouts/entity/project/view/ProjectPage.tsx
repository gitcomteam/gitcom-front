import React from "react";
import FullPageWithSideBar from "../../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import {handleApiError} from "../../../../classes/notification/errorHandler/errorHandler";
import {Button, Card, Col, Divider, Icon, Row} from "antd";
import {BoardModel, ProjectModel} from "../../../../client/bindings";
import BoardCard from "../../../../components/entity/board/single/card/BoardCart";
import PermissionCheckLink from "../../../../components/link/withChecks/PermissionCheckLink";
import AuthCheck from "../../../../components/check/auth_check/AuthCheck";
import AddToLibrary from "../../../../components/entity/my_library/single/action/AddToLibrary";
import RepoCard from "../../../../components/external/repo/card/RepoCard";
import {Link} from "react-router-dom";
import NewInvoice from "../../../../components/entity/invoice/single/create/NewInvoice";

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
    boards: BoardModel[]|null
}

class ProjectPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            project: null,
            boards: null
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

        this.getProjectBoards();
    }

    getProjectBoards(): void {
        window.App.apiClient.getProjectBoards(this.state.project!.guid!)
            .then((result) =>
                this.processGetBoardsResponse(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetBoardsResponse(response: any) {
        let json = JSON.parse(response.bodyAsText);

        this.setState({
            boards: json.data.boards
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

        return <FullPageWithSideBar sidebarType={"project_view"}>
            <h2 className={"ant-typography"}>{project.name}</h2>
            <p>{project.description}</p>
            <Row className="padding-sm" style={{display: "flex", justifyContent: "center"}}>
                <Button className={"margin-sm-sides"} icon={"star"}> {project.stars_count}</Button>
                <div className={"margin-sm-sides"}>
                    <AuthCheck>
                        <AddToLibrary  project={project}/>
                    </AuthCheck>
                </div>
                <div className={"margin-sm-sides"}>
                    <PermissionCheckLink
                        label={"Edit"}
                        entityGuid={project.guid!}
                        entityType={"Project"}
                        icon={"edit"}
                        requiredPermissions={["write"]}
                        url={`/${project.base_uri}/edit`}
                    />
                </div>
                <div className={"margin-sm-sides"}>
                    {
                        window.App.isAuthorized() ?
                            <NewInvoice
                                modalLabel={`Support ${project.name}`}
                                buttonLabel={"Support"}
                                defaultAmount={0.1}
                                entityGuid={project.guid!}
                                entityType={'Project'}
                            /> : <p>
                                <Link to={"/login"}>
                                    <Button type={"primary"}>Sign in</Button>
                                </Link> to support this project
                            </p>
                    }
                </div>
            </Row>

            <Row>
                <Col md={12} xs={24} className="margin-sm-top">
                    <h3 className={"ant-typography"}><Icon type={"info-circle"}/> Details</h3>
                    <div className="text-left">
                        <Row><b>Created at: </b> {project.created_at}</Row>
                        <Row><b>Last updated at: </b> {project.updated_at}</Row>
                    </div>
                </Col>
                <Col md={12} xs={24} className="margin-sm-top">
                    <RepoCard project={project}/>
                </Col>
            </Row>

            <Divider/>

            <h3 className={"ant-typography"}><Icon type="bug"/> Boards</h3>

            <Row>
                {this.state.boards === null ? <Icon type="loading" style={{fontSize: "2em"}}/> : null}
                {this.state.boards != null && this.state.boards.length === 0 ? <div>
                    <b>No boards for this project</b>
                    {/* TODO: add board button */}
                </div> : null}
                {this.state.boards != null && this.state.boards.map((board: BoardModel, i: number) => {
                    return <Col key={i} md={12} xs={24} className="padding-sm">
                        <BoardCard fullProjectName={this.getProjectFullName()} board={board}/>
                    </Col>;
                })}
            </Row>
        </FullPageWithSideBar>;
    }
}

export default ProjectPage;
