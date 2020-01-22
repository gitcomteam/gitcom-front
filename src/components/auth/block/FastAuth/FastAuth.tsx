import React from "react";
import {Button, Divider, Form, Icon, Input, notification, Row} from "antd";
import {Link} from "react-router-dom";

interface IProps {
}

interface IState {
    form: {
        email: string
    }
}

class FastAuth extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            form: {
                email: ""
            }
        }
    }


    updateForm(field: string, val: string) {
        let form: any = this.state.form;
        form[field] = val;
        this.setState({form});
    }

    lazyEmailSignIn() {
        if (
            this.state.form.email.split('@').length === 1 ||
            this.state.form.email.split('.').length === 1
        ) {
            notification['warning']({
                message: 'This email is invalid, please check your email and try again'
            });
            return;
        }
        window.location.replace(`/login?email=${this.state.form.email}`);
    }

    render() {
        return <div>
            <Row>
                <div className="margin-sm-bottom">
                    <Input
                        name={"email"}
                        prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="Email"
                        onChange={(e) => {
                            this.updateForm('email', e.target.value)
                        }}
                    />
                </div>
                <Row className="margin-sm-top">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        onClick={() => this.lazyEmailSignIn()}
                    >Sign in</Button>
                </Row>

                <Divider/>

                <p>Or sign in with one of these services:</p>

                <Row>
                    <Link to={"/login?fast_signin=github"}>
                        <Button icon={"github"}>GitHub</Button>
                    </Link>
                    <Link to={"/login?fast_signin=github"}>
                        <Button className={"margin-sm-sides"} icon={"google"}>Google</Button>
                    </Link>
                    <Link to={"/login?fast_signin=gitlab"}>
                        <Button icon={"gitlab"}>GitLab</Button>
                    </Link>
                </Row>
            </Row>
        </div>
    }
}

export default FastAuth;
