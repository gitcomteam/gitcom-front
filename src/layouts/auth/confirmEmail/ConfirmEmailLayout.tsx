import React from "react";
import FullContainerPage from "../../../components/layout/simple/fullpage/FullContainerPage";
import {Button, Card, Col, Icon, notification, Row} from "antd";
import styles from "../login/styles.module.css";
import {Link} from "react-router-dom";
import { Redirect } from 'react-router';

interface IProps {
    match: {
        params: {
            confirmation_key: string
        }
    }
}

interface IState {
    redirectHome: boolean,
    errorLabel: string|null
}

class ConfirmEmailLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        document.title = "Confirm email | GitCom - Community-Driven open source marketplace";
        super(props);
        this.state = {
            redirectHome: false,
            errorLabel: null
        }
    }

    componentDidMount(): void {
        let confirmationKey = new URL(window.location.href).searchParams.get('confirmation_key') + "";
        window.App.apiClient.postConfirmEmail(confirmationKey)
            .then((res) =>
                this.processConfirmationResponse(res._response))
            .catch((error) => this.handleConfirmError(error.response));
    }

    processConfirmationResponse(response: any) {
        let json = JSON.parse(response.bodyAsText);
        window.App.setApiToken(json.data!.token!);
        this.setState({redirectHome: true});
    }

    handleConfirmError(err: any) {
        try {
            let json = JSON.parse(err.body);
            notification['error']({
                message: json.errors[0].message
            });
            this.setState({errorLabel: json.errors[0].message});
        } catch (e) {
            console.error(e);
            notification['error']({
                message: 'Unknown error, please try again'
            });
        }
    }

    render() {
        if (this.state.redirectHome) return <Redirect to={"/home"}/>;

        let content = <div>
            <h2>Confirming your email</h2><br/>
            <Icon type="loading" style={{fontSize: "2em"}}/>
        </div>;

        if (this.state.errorLabel) content = <div>
            <b>Confirmation failed: {this.state.errorLabel}</b>
            <br/><br/>
            <Link to={"/"}>
                <Button type={"primary"}>Go to main page</Button>
            </Link>
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

export default ConfirmEmailLayout;