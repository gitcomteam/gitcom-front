import React from "react";
import { GoogleLogin } from 'react-google-login';
import {Button} from "antd";
import { Redirect } from 'react-router';
import {handleApiError} from "../../../../classes/notification/errorHandler/errorHandler";

interface IProps {
    classNames: string,
    triggerOnRender: boolean,
}

interface IState {
    loggedIn: boolean,
    isLoading: boolean,
    redirect: boolean,
    forceClickEvent: any,
    googleButton: any
}

class GoogleLoginButton extends React.Component<IProps, IState> {
    public static defaultProps = {
        classNames: "",
        triggerOnRender: false
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            loggedIn: false,
            isLoading: false,
            redirect: false,
            forceClickEvent: null,
            googleButton: null
        };
    }

    componentDidMount(): void {
        this.setState({
            googleButton: <GoogleLogin
                clientId={window.AppConfig.auth.external.google.client_id}
                render={renderProps => {
                    this.setState({forceClickEvent: renderProps.onClick});
                    return <Button
                        icon={"google"}
                        loading={this.state.isLoading}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >via Google</Button>
                }}
                buttonText="Login"
                onSuccess={this.googleProcessOk.bind(this)}
                onFailure={err => console.error(err)}
                cookiePolicy={'single_host_origin'}
            />
        });

        const fastSignIn = new URL(window.location.href).searchParams.get('fast_signin');
        if (fastSignIn === "google") {
            setTimeout(() => {
                this.state.forceClickEvent();
            }, 100);
        }
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
            {this.state.googleButton}
        </div>;
    }
}

export default GoogleLoginButton;
