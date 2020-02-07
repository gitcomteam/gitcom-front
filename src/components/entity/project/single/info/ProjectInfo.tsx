import React from 'react';
import {ProjectModel} from "../../../../../client/bindings";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";
import {Button, Icon, Row} from "antd";
import moment from "moment";
import {retryRequest} from "../../../../../classes/utils/http/retryRequest";
import {Link} from "react-router-dom";
import AddToLibraryButton from "../../../../action/library/AddToLibraryButton/AddToLibraryButton";

interface IProps {
    displayName: boolean,
    guid: string|null,
    project: ProjectModel|null
}

interface IState {
    isLoaded: boolean,

    project: ProjectModel|null
}

class ProjectInfo extends React.Component<IProps, IState> {
    public static defaultProps = {
        displayName: false,
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
        } else {
            retryRequest(() => {
                this.getProject();
            }, () => this.state.isLoaded, true);
        }
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
            { this.props.displayName ? <div>
                <Link to={`/${project.base_uri}`}>
                    <b>{project.name!}</b>
                </Link>
                <br/><br/>
            </div> : null }
            <div className="text-left">
                {project.description!}<br/>
                <Row className="margin-xs"/>
            </div>
            <Row className="text-left">
                <i>Created:</i> {moment(project.created_at).format('MMMM Do YYYY')}
                <br/><br/>
                <AddToLibraryButton project={project}/>
            </Row>
        </div>;
    }
}

export default ProjectInfo;