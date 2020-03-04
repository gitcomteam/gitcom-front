import React from "react";
import {ProjectModel} from "../../../../client/bindings";
import {Button, notification} from "antd";
import {handleApiError} from "../../../../classes/notification/errorHandler/errorHandler";

interface IProps {
    project: ProjectModel
}

interface IState {}

class AddToLibraryButton extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    addToLibrary() {
        if (!window.App.isAuthorized()) {
            notification['warning']({
                message: <div>Please <a href={"/login"}>sign in</a> first</div>
            });
            return;
        }
        window.App.apiClient.addProjectToMyLibrary(window.App.apiToken, this.props.project.guid!)
            .then(() => {
                notification['success']({
                    message: <div>Project was added to <a href="/account/library">your library</a></div>
                });
            })
            .catch((error) => handleApiError(error.response));
    }

    render() {
        return <div>
            <Button
                type={"primary"}
                onClick={() => this.addToLibrary()}
                icon={"star"}
            > {this.props.project.stars_count}
            </Button>
        </div>
    }
}

export default AddToLibraryButton;
