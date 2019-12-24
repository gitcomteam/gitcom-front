import React from "react";
import FacebookLogin from 'react-facebook-login';
import {Button} from "antd";

interface IProps {
    classNames: string
}

interface IState {
    clicked: boolean,
    loading: boolean,

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

            loggedIn: false,
            accessToken: null
        }
    }

    facebookResponse = (data: any) => {
        this.setState({
            loggedIn: true,
            accessToken: data.accessToken
        });
        console.log(this.state.accessToken);
    };

    buttonClicked() {
        this.setState({
            clicked: true,
            loading: true
        });
    }

    render() {
        let facebookBlock = null;

        if (this.state.clicked) {
            facebookBlock =
                <div style={{display: "none"}}>
                    <FacebookLogin
                        appId="553411131889485"
                        autoLoad={true}
                        fields="name,email"
                        callback={this.facebookResponse.bind(this)}
                    />
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
