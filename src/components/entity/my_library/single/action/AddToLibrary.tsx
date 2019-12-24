import React from "react";
import {Button, notification} from "antd";
import {ProjectModel} from "../../../../../client/bindings";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";

interface IProps {
    project: ProjectModel
}

interface IState {
    alreadyAdded: boolean
}

class AddToLibrary extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            alreadyAdded: false
        }
    }

    componentDidMount(): void {
        this.getLibraryStatus();
    }

    getLibraryStatus() {
        window.App.apiClient.getMyLibraryProjectStatus(window.App.apiToken, this.props.project.guid!)
            .then((res) => this.processLibraryStatus(res._response))
            .catch((error) => handleApiError(error.response));
    }

    processLibraryStatus(res: any) {
        let json = JSON.parse(res.bodyAsText);
        this.setState({alreadyAdded: json.data.status.in_library})
    }

    addToMyLibrary() {
        window.App.apiClient.addProjectToMyLibrary(window.App.apiToken, this.props.project.guid!)
            .then(() => this.processProjectAdded())
            .catch((error) => handleApiError(error.response));
    }

    processProjectAdded() {
        notification['success']({
            message: 'Project was added to your library!'
        });
        this.setState({
            alreadyAdded: true
        });
    }

    render() {
        return <div>
            {this.state.alreadyAdded ?
                <Button
                    type={"primary"}
                    icon={"appstore"}
                    disabled={true}
                >In library</Button> :
                <Button
                    type={"primary"}
                    icon={"appstore"}
                    onClick={this.addToMyLibrary.bind(this)}
                >Add to library</Button>
            }
        </div>;
    }
}

export default AddToLibrary;
