import React from "react";
import { GoogleLogin } from 'react-google-login';
import {Button} from "antd";
import { Redirect } from 'react-router';
import {handleApiError} from "../../../../classes/notification/errorHandler/errorHandler";

interface IProps {
    classNames: string
}

interface IState {
    loggedIn: boolean,
    isLoading: boolean,
    redirect: boolean
}

class GoogleLoginButton extends React.Component<IProps, IState> {
    public static defaultProps = {
        classNames: ""
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            loggedIn: false,
            isLoading: false,
            redirect: false
        };
    }

    googleProcessOk(data: any) {
        window.App.apiClient.loginViaGoogle(data.Zi.access_token)
            .then((result) =>
                this.processGetMyToken(result._response))
            .catch((error) => handleApiError(error.response));

        this.setState({
            isLoading: true
        });
    }

    googleProcessFail(data: any) {
        console.error(data);
    }

    processGetMyToken(response: any) {
        let data = JSON.parse(response.bodyAsText).data;
        window.App.setApiToken(data.token);
        this.setState({
            redirect: true
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={"/home"}/>
        }

        return <div className={this.props.classNames}>
            <GoogleLogin
                clientId={window.AppConfig.auth.external.google.client_id}
                render={renderProps => (
                    <Button
                        icon={"google"}
                        loading={this.state.isLoading}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >via Google</Button>
                )}
                buttonText="Login"
                onSuccess={this.googleProcessOk.bind(this)}
                onFailure={this.googleProcessFail.bind(this)}
                cookiePolicy={'single_host_origin'}
            />
        </div>;
    }
}

export default GoogleLoginButton;
