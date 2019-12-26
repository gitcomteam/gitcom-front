import React, {SyntheticEvent} from "react";
import FullContainerPage from "../../../components/layout/simple/fullpage/FullContainerPage";
import {Button, Card, Col, Divider, Form, Icon, Input, notification, Row, Typography} from "antd";
import styles from "../login/styles.module.css";
import {Link} from "react-router-dom";

const { Title } = Typography;

interface IProps {
}

interface IState {
    isLoading: boolean,
    registrationComplete: boolean,
    form: {
        login: string,
        email: string,
        password: string
    }
}

class RegisterLayout extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            registrationComplete: false,
            isLoading: false,
            form: {
                login: "",
                email: "",
                password: ""
            }
        };
    }

    handleFieldUpdate(e: SyntheticEvent) {
        let target: any = e.target;
        let name: string = target.name;
        let formState = this.state.form;
        switch (name) {
            case "login":
                formState.login = target.value;
                break;
            case "email":
                formState.email = target.value;
                break;
            case "password":
                formState.password = target.value;
                break;
        }
        this.setState({form: formState});
    }

    handleSubmit(event: any) {
        event.preventDefault();

        if (this.state.isLoading) {
            return;
        }

        const form = this.state.form;

        window.App.apiClient.postRegister(form.login, form.email, form.password)
            .then(() => this.processRegisterResponse())
            .catch((error) => this.handleRegisterError(error));
    }

    processRegisterResponse() {
        notification['success']({
            message: 'You almost there! Check your email for confirmation link'
        });
        this.setState({registrationComplete: true});
    }

    handleRegisterError(err: any) {
        try {
            let json = JSON.parse(err.response.body);
            notification['warning']({
                message: json.errors[0].message
            });
        } catch (e) {
            notification['error']({
                message: 'Unknown error, please try again'
            });
        }
    }

    render() {
        let content = <div>
            <Link to={"/login"}>
                <Button type={"default"}>Login</Button>
            </Link>
            <Divider/>
            <Title level={3}>Register</Title>
            <Form action={"#"} onSubmit={this.handleSubmit.bind(this)}>
                <Form.Item>
                    <Input
                        name={"login"}
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="Login"
                        onChange={this.handleFieldUpdate.bind(this)}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        name={"email"}
                        prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
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
                >Register</Button>
            </Form>
        </div>;

        if (this.state.registrationComplete) content = <div>
            <p>
                Registration is almost complete, you just need to confirm your email. We've sent you a confirmation link to <b>{this.state.form.email}</b>
            </p>
        </div>;

        return (
            <FullContainerPage>
                <Row type={"flex"} justify={"center"}>
                    <Col xxl={8} xl={8} md={12} xs={24} className={styles.verticalCenter}>
                        <Card>
                            {content}
                        </Card>
                    </Col>
                </Row>
            </FullContainerPage>
        );
    }
}

export default RegisterLayout;