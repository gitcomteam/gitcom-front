import {LibraryItem, ProjectModel} from "../../../../../client/bindings";
import React from "react";
import HoverableCard from "../../../card/single/hoverable/HoverableCard";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";
import {Button, notification, Row} from "antd";
import ProjectInfo from "../../../project/single/info/ProjectInfo";
import {Link} from "react-router-dom";
import {retryRequest} from "../../../../../classes/utils/http/retryRequest";

interface IProps {
    item: LibraryItem
}

interface IState {
    isRemoved: boolean,
    project: ProjectModel|null
}

class ItemCard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isRemoved: false,
            project: null
        }
    }

    componentDidMount(): void {
        retryRequest(() => {
            this.getProject();
        }, () => this.state.project !== null, true);
    }

    getProject(): void {
        window.App.apiClient.getProject(this.props.item.project_guid!)
            .then((response) =>
                this.processGetProject(response._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetProject(response: any): void {
        let json : any = JSON.parse(response.bodyAsText);

        this.setState({
            project: json.data.project
        });
    }

    removeFromLibrary() {
        window.App.apiClient.removeProjectFromMyLibrary(window.App.apiToken, this.props.item.project_guid!)
            .then(() => this.processRemoveItem())
            .catch((error) => handleApiError(error.response));
    }

    processRemoveItem() {
        notification['success']({
            message: 'Project was removed from your library',
            description: ''
        });

        this.setState({
            isRemoved: true
        });
    }

    render() {
        let project = this.state.project;

        return <HoverableCard>
            <ProjectInfo guid={this.props.item.project_guid!}/>
            <Row>
                <b>Added: </b><p className="inline">{this.props.item.created_at}</p>
            </Row>
            {project && project.base_uri ?
                <Link to={"/" + project!.base_uri}><Button
                    type={"primary"}
                    icon={"link"}
                    className="margin-sm"
                >Open page</Button></Link> : null
            }
            <Button
                type={"danger"}
                icon={"close"}
                className="margin-sm"
                disabled={this.state.isRemoved}
                onClick={this.removeFromLibrary.bind(this)}
            >Remove</Button>
        </HoverableCard>
    }
}

export default ItemCard;