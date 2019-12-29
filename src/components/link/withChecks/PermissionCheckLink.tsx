import React from "react";
import {Link} from "react-router-dom";
import {Button, Icon} from "antd";
import {EntityType} from "../../../client/models";

interface IProps {
    label: string,
    entityGuid: string,
    entityType: EntityType,
    requiredPermissions: string[],
    icon: string|null,
    url: string
}

interface IState {
    isLoading: boolean,
    gotPermissions: boolean
}

class PermissionCheckLink extends React.Component<IProps, IState> {
    public static defaultProps ={
        icon: null
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoading: true,
            gotPermissions: false
        }
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.getPermissions();
        }, Math.floor(Math.random() * 750));
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
        return <Link to={this.props.url}>
            <Button
                icon={this.props.icon ? this.props.icon : ""}
                type={"default"}
            >{this.props.label}</Button>
        </Link>;
    }
}

export default PermissionCheckLink;
