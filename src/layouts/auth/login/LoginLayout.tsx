import React, {SyntheticEvent} from 'react';
import FullContainerPage from "../../../components/layout/simple/fullpage/FullContainerPage";
import {Button, Card, Col, Form, Icon, Input, Row, Typography, notification, Divider} from "antd";
import {GetLoginOKResponse} from "../../../client/models";
import styles from './styles.module.css';
import { Redirect } from 'react-router';
import ConnectButton from "../../../components/external/auth/connectButton/ConnectButton";
import FacebookLoginButton from "../../../components/external/auth/facebookButton/FacebookLoginButton";
import GoogleLoginButton from "../../../components/external/auth/googleButton/GoogleLoginButton";

const { Title } = Typography;

interface IProps {
}

interface IState {
    email: string,
    password: string,

    isLoading: boolean,
    loggedIn: boolean,
    redirectToHome: boolean
}

class LoginLayout extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",

            isLoading: false,
            loggedIn: false,
            redirectToHome: false
        };
    }

    componentDidMount(): void {
        if (window.App.apiToken) {
            this.setState({
                loggedIn: true,
                isLoading: true
            });
            this.loggedInRedirect();
        }
    }

    loggedInRedirect() {
        setTimeout(() => {
            this.setState({
                redirectToHome: true
            });
        }, 2000);
    }

    handleFieldUpdate(e: SyntheticEvent) {
        let target: any = e.target;
        let name: string = target.name;
        switch (name) {
            case "email":
                this.setState({email: target.value});
                break;
            case "password":
                this.setState({password: target.value});
                break;
        }
    }

    handleSubmit(event: any) {
        event.preventDefault();

        if (this.state.isLoading) {
            return;
        }

        window.App.apiClient.getLogin({
            email: this.state.email,
            password: this.state.password
        })
            .then((result) => this.processLoginResponse(result._response))
            .catch((error) => this.handleLoginError(error));
    }
    
    handleLoginError(data: any) {
        let response = data.response;
        let json = JSON.parse(response.body);
        json.errors.forEach(function (val: any) {
            notification['error']({
                message: 'Login error',
                description: val.message
            });
        });
    }

    processLoginResponse(response: any) {
        let body: GetLoginOKResponse = JSON.parse(response.bodyAsText);
        window.App.setApiToken(body.data!.token!);
        this.setState({
            loggedIn: true,
            isLoading: true
        });
        this.loggedInRedirect();
    }

    render() {
        let formWithTitle = <div>
            <Title level={3}>Log in</Title>
            <Form action={"#"} onSubmit={this.handleSubmit.bind(this)}>
                <Form.Item>
                    <Input
                        name={"email"}
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="Email"
                        onChange={this.handleFieldUpdate.bind(this)}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        name={"password"}
                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        type="password"
                        placeholder="Password"
                        onChange={this.handleFieldUpdate.bind(this)}
                    />
                </Form.Item>
                <Button
                    loading={this.state.isLoading}
                    onClick={this.handleSubmit.bind(this)}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >Log in</Button>

                <Divider/>
                <Row>
                    <Col xs={12}>
                        <ConnectButton
                            buttonType={"default"}
                            buttonIcon={"github"}
                            buttonLabel={"via GitHub"}
                            service={"github"}
                            buttonClassNames="margin-sm-sides"
                        />
                    </Col>
                    <Col xs={12}>
                        <ConnectButton
                            buttonType={"default"}
                            buttonIcon={"gitlab"}
                            buttonLabel={"via GitLab"}
                            service={"gitlab"}
                            buttonClassNames="margin-sm-sides"
                        />
                    </Col>
                </Row>
                <Row className={"margin-sm-top"}>
                    <Col xs={12}>
                        <GoogleLoginButton classNames="margin-sm-sides"/>
                    </Col>
                </Row>
            </Form>
        </div>;

        let loggedInContents = <div>
            <Title level={4}>You're logged in, redirecting...</Title>
            <Icon type="loading" style={{fontSize: "2em"}}/>
            { this.state.redirectToHome ? <Redirect to={"/home"}/> : <div/> }
        </div>;

        return (
            <FullContainerPage>
                <Row type={"flex"} justify={"center"}>
                    <Col xxl={8} xl={8} md={12} xs={24} className={styles.verticalCenter}>
                        <Card>
                            {!this.state.isLoading ? formWithTitle : loggedInContents}
                        </Card>
                    </Col>
                </Row>
            </FullContainerPage>
        );
    }
}

export default LoginLayout;