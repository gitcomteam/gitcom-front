import React from "react";
import {Input, Row, Button, notification, Icon} from "antd";

interface IProps {
}

interface IState {
    email: string
}

class SubscribeToMailingList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            email: ''
        }
    }

    updateEmail(newEmail: string) {
        this.setState({
            email: newEmail
        });
        console.log(this.state);
    }

    submitForm() {
        let email = this.state.email;

        if (email.split('@').length === 1 || email.split('.').length === 1) {
            notification['warning']({
                message: 'This email is invalid, please check your email and try again'
            });
            return;
        }

        window.App.apiClient.postSubscribeToMailingList(email).then(() => {
            notification['success']({
                message: "You've just subscribed! Thank you :)"
            })
        });
    }

    render() {
        return <div>
            <Row>
                <Input
                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    onChange={(e) => {this.updateEmail(e.target.value)}}
                    placeholder={'Your email'}
                />
                <Button
                    className={"margin-sm-top"}
                    type={"primary"}
                    onClick={() => this.submitForm()}
                >Subscribe</Button>
            </Row>
        </div>
    }
}

export default SubscribeToMailingList;
