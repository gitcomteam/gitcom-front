import React from "react";
import NewInvoice from "../../entity/invoice/single/create/NewInvoice";
import {Link} from "react-router-dom";
import {Button, Col, Modal, Row} from "antd";

interface IProps {
    entityName: string,
    entityGuid: string,
    entityType: any,
}

interface IState {
    showModal: boolean,
}

export default class SupportButton extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            showModal: true,
        }
    }

    render() {
        let supportLabel = `Support ${this.props.entityName}`;

        return <div>
            <Modal
                title={<b className="text-center">{supportLabel}</b>}
                visible={this.state.showModal}
                width={window.innerWidth < 1000 ? "90%" : "50%"}
                onCancel={() => {
                    this.setState({showModal: false})
                }}
                footer={null}
            >
                <Row className={"text-center"}>
                    <Col xs={24}><b>Pay using PayPal (Gumroad)</b></Col>
                    <Col xs={24} className={"padding-sm"}>
                        <a className="gumroad-button margin-sm" href="https://gum.co/cwJwx">Single payment</a>
                        <a className="gumroad-button margin-sm" href="https://gum.co/rLGYl" target="_blank">Monthly subscription</a>
                    </Col>
                    <Col xs={24} className={"padding-sm"}>
                        <b className={"margin-sm-vertical"}>Pay with cryptocurrency</b>
                    </Col>
                    <Col xs={24}>
                        {
                            window.App.isAuthorized() ?
                                <NewInvoice
                                    modalLabel={`Support project financially`}
                                    buttonLabel={`Support with crypto`}
                                    defaultAmount={0.1}
                                    entityGuid={this.props.entityGuid}
                                    entityType={this.props.entityType}
                                /> : <p>
                                    <Link to={"/login"}>
                                        <Button type={"primary"}>Sign in</Button>
                                    </Link> to pay via crypto
                                </p>
                        }
                    </Col>
                </Row>
            </Modal>
            <Button
                type={"primary"}
                onClick={() => {this.setState({showModal: true})}}
                icon={"dollar"}
            >Fund this {this.props.entityType.toLowerCase()}</Button>
        </div>
    }
}
