import React from 'react';
import {Button, Icon} from "antd";
import {handleApiError} from "../../../../classes/notification/errorHandler/errorHandler";

interface IProps {
    service: string,
    buttonLabel: string,
    buttonIcon: string,
    buttonType: string,
    buttonClassNames: string
}

interface IState {
    isLoaded: boolean,
    loginUrl: string
}

class ConnectButton extends React.Component<IProps, IState> {
    public static defaultProps = {
        buttonLabel: "Connect",
        buttonIcon: "",
        buttonType: "primary",
        buttonClassNames: ""
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            loginUrl: ""
        };
    }

    componentDidMount(): void {
        this.getLoginUrlRequest();
    }

    getLoginUrlRequest(): void {
        switch (this.props.service) {
            case "github":
                window.App.apiClient.getGitHubLoginLink()
                    .then((result) =>
                        this.processGetLoginLinkResponse(result._response))
                    .catch((error) => handleApiError(error.response));
                break;
            case "gitlab":
                window.App.apiClient.getGitLabLoginLink()
                    .then((result) =>
                        this.processGetLoginLinkResponse(result._response))
                    .catch((error) => handleApiError(error.response));
                break;
        }
    }

    processGetLoginLinkResponse(response: any) {
        let data = JSON.parse(response.bodyAsText).data;
        this.setState({
            isLoaded: true,
            loginUrl: data.login_link
        });
    }

    render() {
        if (!this.state.isLoaded) {
            return <Icon type="loading" style={{fontSize: "2em"}}/>;
        }
        let buttonType: any = this.props.buttonType;
        return (
            <a href={this.state.loginUrl}>
                <Button
                    icon={this.props.buttonIcon}
                    type={buttonType}
                    className={this.props.buttonClassNames}
                >{this.props.buttonLabel}</Button>
            </a>
        );
    }
}

export default ConnectButton;