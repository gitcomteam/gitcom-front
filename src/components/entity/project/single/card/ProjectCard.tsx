import {ProjectModel} from "../../../../../client/bindings";
import React from "react";
import {Link} from "react-router-dom";
import {Card} from "antd";
import ProjectInfo from "../info/ProjectInfo";

interface IProps {
    project: ProjectModel
}

interface IState {
}

class ProjectCard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return <Link to={"/" + this.props.project.base_uri}>
            <Card className="hover-pointer material-shadow-hover-1">
                <ProjectInfo project={this.props.project}/>
            </Card>
        </Link>;
    }
}

export default ProjectCard;
