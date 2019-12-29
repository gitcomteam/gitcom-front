import React from "react";
import {Button, Col, Input, Modal, notification, Row, Select} from "antd";
import {CurrencyType} from "../../../../../client/models";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";

const { Option } = Select;

interface IProps {
}

interface IState {
    showModal: boolean,
    form: {
        address: string,
        amount: number,
        currency_type: CurrencyType
    }
}

class NewWithdrawalButton extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            showModal: false,
            form: {
                address: "",
                amount: 0.01,
                currency_type: "Usd"
            }
        };
    }

    allowedCurrencyTypes(): string[] {
        return ["Usd", "BitCoin", "LiteCoin", "Waves", "Ethereum"];
    }

    updateForm(field: string, val: any) {
        let form: any = this.state.form;
        form[field] = val;
        this.setState({form});
    }

    sendWithdrawalRequest() {
        let form = this.state.form;
        window.App.apiClient.postWithdrawalRequest(window.App.apiToken, form.amount, form.address, form.currency_type)
            .then(() => {
                notification['success']({
                    message: 'Withdrawal request was created'
                });
                this.setState({showModal: false});
                setTimeout(() => { window.location.reload(); }, 1500);
            })
            .catch((error) => handleApiError(error.response));
    }

    render() {
        return <div>
            <Modal
                title={<b className="text-center">New withdrawal request</b>}
                visible={this.state.showModal}
                width={window.innerWidth < 1000 ? "90%" : "40%"}
                onCancel={() => {
                    this.setState({showModal: false})
                }}
                footer={null}
            >
                <Row>
                    <Col md={8} xs={24}><b>Withdraw address</b></Col>
                    <Col md={16} xs={24}>
                        <Input
                            onChange={(e) => {this.updateForm('address', e.target.value)}}
                            placeholder={"Your paypal email or selected cryptocurrency address"}
                        />
                    </Col>
                </Row>
                <Row className="margin-sm-vertical">
                    <Col md={8} xs={24}><b>Amount</b></Col>
                    <Col md={16} xs={24}>
                        <Input
                            onChange={(e) => {this.updateForm('amount', parseFloat(e.target.value))}}
                            defaultValue={'0.01'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={8} xs={24}><b>Currency type</b></Col>
                    <Col md={16} xs={24}>
                        <Select
                            style={{width: "100%"}}
                            defaultValue={"Usd"}
                            onChange={(e:any) => {this.updateForm('currency_type', e)}}
                        >
                            {this.allowedCurrencyTypes().map((allowedValue: string) => {
                                return <Option key={allowedValue}>{allowedValue}</Option>;
                            })}
                        </Select>
                    </Col>
                </Row>
                <Row className="margin-sm-top flex-center">
                    <Button
                        icon={"plus"}
                        type={"primary"}
                        onClick={this.sendWithdrawalRequest.bind(this)}
                    >Create</Button>
                </Row>
            </Modal>
            <Button
                icon={"plus"} type={"primary"} onClick={() => {this.setState({showModal: true})}}
            >New withdrawal</Button>
        </div>
    }
}

export default NewWithdrawalButton;
