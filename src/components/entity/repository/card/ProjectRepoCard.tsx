import React from "react";
import {ProjectModel} from "../../../../client/bindings";

interface IProps {
    project: ProjectModel
}

interface IState {
}

class ProjectRepoCard extends React.Component<IProps, IState> {
    componentDidMount(): void {
    }

    render() {
        return <div/>;
    }
}

export default ProjectRepoCard;