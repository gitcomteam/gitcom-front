import React from "react";
import FacebookLogin from 'react-facebook-login';
import {Button} from "antd";
import {handleApiError} from "../../../../classes/notification/errorHandler/errorHandler";
import { Redirect } from 'react-router';

interface IProps {
    classNames: string
}

interface IState {
    clicked: boolean,
    loading: boolean,
    redirectHome: boolean,

    loggedIn: boolean,
    accessToken: string|null
}

class FacebookLoginButton extends React.Component<IProps, IState> {
    public static defaultProps = {
        classNames: ""
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            clicked: false,
            loading: false,
            redirectHome: false,

            loggedIn: false,
            accessToken: null
        }
    }

    facebookResponse = (data: any) => {
        this.setState({
            loggedIn: true,
            accessToken: data.accessToken
        });
        this.loginViaFacebook();
    };

    loginViaFacebook() {
        window.App.apiClient.loginViaFacebook(this.state.accessToken!)
            .then((result) =>
                this.processFacebookLoginRes(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processFacebookLoginRes(res: any) {
        let json = JSON.parse(res.bodyAsText);
        window.App.setApiToken(json.data.token);
        this.setState({redirectHome: true});
    }

    buttonClicked() {
        this.setState({
            clicked: true,
            loading: true
        });
    }

    render() {
        let facebookBlock = null;

        if (this.state.redirectHome) {
            return <Redirect to={"/home"}/>;
        }

        if (this.state.clicked) {
            facebookBlock =
                <div style={{display: "none"}}>
                    {/*<FacebookLogin*/}
                    {/*    appId={"id-here"}*/}
                    {/*    autoLoad={true}*/}
                    {/*    fields="name,email,picture"*/}
                    {/*    callback={this.facebookResponse.bind(this)}*/}
                    {/*/>*/}
                </div>;
        }

        return <div className={this.props.classNames}>
            {facebookBlock}
            <Button
                icon={"facebook"}
                loading={this.state.loading}
                type={"default"}
                onClick={this.buttonClicked.bind(this)}
            >via Facebook</Button>
        </div>;
    }
}

export default FacebookLoginButton;
