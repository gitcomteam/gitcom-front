import {ProjectModel} from "../../../../../client/bindings";
import React from "react";
import {Link} from "react-router-dom";
import {Card} from "antd";
import ProjectInfo from "../info/ProjectInfo";

interface IProps {
    project: ProjectModel
}

interface IState {}

class ProjectCard extends React.Component<IProps, IState> {
    render() {
        const project = this.props.project;
        return <Card
            className="hover-pointer material-shadow-hover-1"
            title={<Link to={"/" + project.base_uri}>{project.name}</Link>}
        >
            <ProjectInfo project={project}/>
        </Card>;
    }
}

export default ProjectCard;
