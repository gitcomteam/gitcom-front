import React from "react";
import {ProjectModel} from "../../../client/bindings";
import {Link} from "react-router-dom";

interface IProps {
    projectGuid: string
}

interface IState {
    isLoaded: boolean,
    project: ProjectModel|null
}

class ProjectLink extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            project: null,
        }
    }

    componentDidMount() {
        window.App.apiClient.getProject(this.props.projectGuid).then(res => {
            let project = JSON.parse(res._response.bodyAsText).data.project;
            this.setState({
                isLoaded: true,
                project
            })
        });
    }

    render() {
        if (!this.state.isLoaded) return null;
        const project = this.state.project;
        return <Link to={`/${project!.base_uri}`}>{project!.name}</Link>
    }
}

export default ProjectLink;
