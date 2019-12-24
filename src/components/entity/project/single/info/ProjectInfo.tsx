import React from 'react';
import {ProjectModel} from "../../../../../client/bindings";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";
import {Button, Divider, Icon, Row} from "antd";
import moment from "moment";

interface IProps {
    guid: string|null,
    project: ProjectModel|null
}

interface IState {
    isLoaded: boolean,

    project: ProjectModel|null
}

class ProjectInfo extends React.Component<IProps, IState> {
    public static defaultProps = {
        guid: null,
        project: null
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            project: null
        }
    }

    componentDidMount(): void {
        if (this.props.project) {
            this.setState({
                isLoaded: true,
                project: this.props.project
            });
            return;
        }
        this.getProject();
    }

    getProject() {
        window.App.apiClient.getProject(this.props.guid!)
            .then((result) =>
                this.processProject(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processProject(response: any) {
        let json = JSON.parse(response.bodyAsText);

        this.setState({
            isLoaded: true,
            project: json.data.project
        });
    }

    render() {
        if (!this.state.isLoaded) {
            return <Icon type="loading" style={{fontSize: "2em"}}/>;
        }

        let project : ProjectModel = this.state.project!;

        return <div>
            <b>{project.name!}</b>
            <br/><br/>
            <p className="text-left">
                {project.description!}<br/>
                <Row className="margin-xs"/>
            </p>
            <Row className="text-left">
                <i>Created:</i> {moment(project.created_at).format('MMMM Do YYYY')}
                <br/><br/>
                <Button icon={"star"}>?</Button>
            </Row>
        </div>;
    }
}

export default ProjectInfo;