import React from "react";
import {ProjectModel} from "../../../../../client/bindings";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";
import {Col, Icon, Row} from "antd";
import ProjectCard from "../../single/card/ProjectCard";
import {retryRequest} from "../../../../../classes/utils/http/retryRequest";

interface IProps {
    label: string,
    type: string
}

interface IState {
    isLoaded: boolean,
    projects: ProjectModel[]|null
}

class ProjectCardList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            projects: null
        }
    }

    componentDidMount(): void {
        retryRequest(() => {
            this.getProjects();
        }, () => this.state.isLoaded, true);
    }

    getProjects() {
        switch (this.props.type) {
            case "newest":
                window.App.apiClient.getNewestProjects()
                    .then((result) =>
                        this.processGetProjects(result._response))
                    .catch((error) => handleApiError(error.response));
                break;
            case "random":
                window.App.apiClient.getRandomProjects()
                    .then((result) =>
                        this.processGetProjects(result._response))
                    .catch((error) => handleApiError(error.response));
                break;
        }
    }

    processGetProjects(response: any) {
        let json = JSON.parse(response.bodyAsText);
        this.setState({
            isLoaded: true,
            projects: json.data.projects
        })
    }

    render() {
        let projectsList = this.state.projects ? this.state.projects.slice(0, 9) : null;

        return <div>
            <h4 className={"ant-typography"}>{this.props.label}</h4>
            { this.state.isLoaded ?
                <Row type={"flex"}>
                    {projectsList && projectsList.map((project: ProjectModel, i: number) => {
                        return <Col className="padding-sm" md={8} sm={12} xs={24} key={i}>
                            <ProjectCard project={project}/>
                        </Col>;
                    })}
                </Row> :
                <Icon type="loading" style={{fontSize: "2em"}}/>
            }
        </div>;
    }
}

export default ProjectCardList;