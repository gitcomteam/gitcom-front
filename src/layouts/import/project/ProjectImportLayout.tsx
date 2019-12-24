import React from "react";
import FullPageWithSideBar from "../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import {handleApiError, showUnknownError} from "../../../classes/notification/errorHandler/errorHandler";
import {Icon} from "antd";
import { Redirect } from "react-router";
const queryString = require('query-string');

interface IProps {
}

interface IState {
    isLoaded: boolean,
    alreadyImported: boolean,
    isImported: boolean,
    importedProjectGuid: string|null,
    importedProjectUri: string|null,
    redirectBlock: any
}

class ProjectImportLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            isImported: false,
            alreadyImported: false,
            importedProjectGuid: null,
            importedProjectUri: null,
            redirectBlock: null
        };
    }

    componentWillUnmount(): void {
        this.setState({
            redirectBlock: null
        });
    }

    componentDidMount(): void {
        this.sendImportRequest();
    }

    sendImportRequest() {
        let queryParams = queryString.parseUrl(window.location.href).query;

        window.App.apiClient.postImportRepository(
            window.App.apiToken,
            queryParams.origin_id,
            queryParams.service_type
        )
            .then((result) =>
                this.processImportResponse(result._response))
            .catch((error) => this.handleImportApiError(error.response));
    }

    handleImportApiError(response: any) {
        if (response === undefined) {
            return;
        }

        let json = JSON.parse(response.body);

        let error = json.errors[0];

        if (error.message === "Project is already imported") {
            this.setState({
                isLoaded: true,
                alreadyImported: true,
                importedProjectGuid: json.metadata.project_guid
            });
            this.redirectToImportedProject();
            return;
        }

        handleApiError(response);
    }

    processImportResponse(response: any) {
        let json = JSON.parse(response.bodyAsText);

        if (json.data.project) {
            this.setState({
                isImported: true,
                isLoaded: true,
                importedProjectUri: json.data.project.base_uri
            });
            this.redirectToImportedProject();
        } else {
            showUnknownError();
        }
    }

    redirectToImportedProject() {
        setTimeout(() => {
            this.setState({
                redirectBlock: <Redirect to={"/" + this.state.importedProjectUri}/>
            });
        }, 2000);
    }

    getContent() {
        let result = null;

        if (!this.state.isLoaded) {
            return <div>
                <h3 className={"ant-typography"}>Importing your project</h3>
                <Icon type="loading" style={{fontSize: "2em"}}/>
            </div>;
        }

        if (this.state.alreadyImported && this.state.importedProjectGuid !== "") {
            return <div>
                <h3 className={"ant-typography"}>Project is already imported, redirecting to project page</h3>
                <Icon type="loading" style={{fontSize: "2em"}}/>
            </div>;
        }

        if (this.state.isImported) {
            return <div>
                <h3 className={"ant-typography"}>Project is imported! Redirecting to project page</h3>
                <Icon type="loading" style={{fontSize: "2em"}}/>
            </div>;
        }

        return result;
    }

    render() {
        return <FullPageWithSideBar sidebarType={"home"}>
            {this.getContent()}
            {this.state.redirectBlock}
        </FullPageWithSideBar>;
    }
}

export default ProjectImportLayout;
