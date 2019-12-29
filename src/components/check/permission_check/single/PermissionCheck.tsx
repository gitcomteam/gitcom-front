import React from "react";
import {EntityType} from "../../../../client/models";
import {Icon} from "antd";
import {retryRequest} from "../../../../classes/utils/http/retryRequest";

interface IProps {
    entityGuid: string,
    entityType: EntityType,
    requiredPermissions: string[],
}

interface IState {
    isLoading: boolean,
    gotPermissions: boolean
}

class PermissionCheck extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoading: true,
            gotPermissions: false
        }
    }

    componentDidMount(): void {
        setTimeout(() => {
            retryRequest(() => {
                this.getPermissions();
            }, () => this.state.isLoading, false);
        }, Math.floor(Math.random() * 1000));
    }

    getPermissions() {
        window.App.apiClient.entityType = this.props.entityType;
        window.App.apiClient.getMyEntityPermissions(window.App.apiToken, this.props.entityGuid)
            .then((result) =>
                this.processGotPermissions(result._response))
            .catch(() => this.processApiError());
    }

    processApiError() {
        this.setState({
            isLoading: false,
            gotPermissions: false
        });
    }

    processGotPermissions(response: any) {
        let data = JSON.parse(response.bodyAsText).data;

        let gotPermissions = true;

        this.props.requiredPermissions.forEach((permission: string) => {
            if (!data.permissions.includes(permission)) {
                gotPermissions = false;
            }
        });

        this.setState({
            isLoading: false,
            gotPermissions: gotPermissions
        });
    }

    render() {
        if (this.state.isLoading) {
            return <Icon type="loading" style={{fontSize: "2em"}}/>;
        }
        if (!this.state.gotPermissions) {
            return <div/>;
        }
        return <div>
            {this.props.children}
        </div>;
    }
}

export default PermissionCheck;
