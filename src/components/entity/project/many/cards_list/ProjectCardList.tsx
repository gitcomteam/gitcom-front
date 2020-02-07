import React from "react";
import {ProjectModel} from "../../../../../client/bindings";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";
import {Card, Col, Row, Skeleton} from "antd";
import ProjectCard from "../../single/card/ProjectCard";

const { Meta } = Card;

interface IProps {
    label: string,
    type: string,
    userGuid: string|null
}

interface IState {
    isLoaded: boolean,
    projects: ProjectModel[]|null
}

class ProjectCardList extends React.Component<IProps, IState> {
    public static defaultProps = {
        userGuid: null
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            projects: null
        }
    }

    componentDidMount(): void {
        this.getProjects();
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
            case "user":
                window.App.apiClient.getUserProjects(this.props.userGuid!)
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
        });
    }

    render() {
        let projectsList = this.state.projects ? this.state.projects : null;

        let loadingCards = [];
        if (!this.state.isLoaded) {
            for (let i = 0; i < 10; i++) {
                loadingCards.push(
                    <Col className="padding-sm" sm={12} xs={24} key={`${this.props.type}_${i}_preload`}>
                        <Skeleton loading={true} active>
                            <Meta title="" description=""/>
                        </Skeleton>
                    </Col>
                );
            }
        }

        return <div>
            <h4 className={"ant-typography"}>{this.props.label}</h4>
            {this.state.isLoaded ?
                <Row type={"flex"}>
                    {projectsList && projectsList.map((project: ProjectModel) => {
                        return <Col className="padding-sm" sm={12} xs={24} key={`${this.props.type}_${project.guid}`}>
                            <ProjectCard project={project}/>
                        </Col>;
                    })}
                </Row> :
                <Row type={"flex"}>{loadingCards.map(cardBlock => cardBlock)}</Row>
            }
        </div>;
    }
}

export default ProjectCardList;