import React, {SyntheticEvent} from "react";
import {CardModel, InvoiceModel} from "../../../../../client/bindings";
import {Button, Col, Input, Modal, notification, Row, Select} from "antd";
import CurrencyType from "../../../../../enum/CurrencyType";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";
import InvoiceContent from "../view/content/InvoiceContent";
import WarningBlock from "../../../../info/payment/WarningBlock/WarningBlock";

const { Option } = Select;

interface IProps {
    card: CardModel
}

interface IState {
    showModal: boolean,
    showInvoiceModal: boolean,
    selectedCurrency: number|null,
    currencyAmount: number,
    isLoaded: boolean,
    isButtonPressed: boolean,
    invoice: InvoiceModel|null
}

class NewInvoice extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            showModal: false,
            showInvoiceModal: false,

            selectedCurrency: null,
            currencyAmount: 0,
            isLoaded: false,
            isButtonPressed: false,
            invoice: null
        }
    }

    fundButtonClick() {
        this.checkInvoice();
        this.setState({
            showModal: true
        });
    }

    onCurrencySelected(type: any) {
        this.setState({
            selectedCurrency: type
        });
    }

    updatedCurrencyAmount(e: SyntheticEvent) {
        const target: any = e.target;

        if (parseFloat(target.value) <= 0) {
            return;
        }
        this.setState({
            currencyAmount: target.value
        });
    }

    getCurrencyTypes() {
        let result = [];
        result[CurrencyType.Usd] = {
            name: 'USD (US$) - Paypal',
            option_value: CurrencyType.Usd,
            min_amount: 0.25
        };
        result[CurrencyType.BitCoin] = {
            name: 'BitCoin',
            option_value: CurrencyType.BitCoin,
            min_amount: 0.00001
        };
        result[CurrencyType.Ethereum] = {
            name: 'Ethereum',
            option_value: CurrencyType.Ethereum,
            min_amount: 0.0001
        };
        result[CurrencyType.Erc20Token] = {
            name: 'ERC20 Token (any Ethereum token)',
            option_value: CurrencyType.Erc20Token,
            min_amount: 0.0001
        };
        result[CurrencyType.Waves] = {
            name: 'Waves',
            option_value: CurrencyType.Waves,
            min_amount: 0.001
        };
        result[CurrencyType.WavesToken] = {
            name: 'Any Waves token',
            option_value: CurrencyType.WavesToken,
            min_amount: 0.0001
        };
        result[CurrencyType.LiteCoin] = {
            name: 'Any Waves token',
            option_value: CurrencyType.LiteCoin,
            min_amount: 0.0001
        };
        return result;
    }

    onButtonClicked() {
        this.setState({
            isButtonPressed: true
        });
        this.submitInvoice();
    }

    submitInvoice(): void {
        let selectedCurrency : any = CurrencyType[this.state.selectedCurrency!];
        window.App.apiClient.postInvoice(window.App.apiToken, this.props.card.guid!, 'Card', 0.01, selectedCurrency)
            .then((result) =>
                this.processPostInvoice(result._response))
            .catch((error) => this.handleApiError(error.response));
    }

    handleApiError(response: any) {
        try {
            if (response.status === 403) {
                notification['warning']({
                    message: 'Invoice already exists',
                    description: ''
                });
                return;
            }
        } catch (e) {
            handleApiError(response);
        }
    }

    processPostInvoice(response: any) {
        let json = JSON.parse(response.bodyAsText);
        this.setState({
            invoice: json.data.invoice,
            showModal: false,
            showInvoiceModal: true
        });
    }

    checkInvoice(): void {
        if (this.state.invoice) {
            this.setState({
                showModal: false,
                showInvoiceModal: true
            });
        }
    }

    render() {
        const currencyTypes = this.getCurrencyTypes();

        return <div>
            <Modal
                title={<b className="text-center">Invoice</b>}
                visible={this.state.showInvoiceModal}
                width={window.innerWidth < 1000 ? "90%" : "30%"}
                onCancel={() => {
                    this.setState({showInvoiceModal: false})
                }}
                footer={null}
            >
                <WarningBlock/>
                {this.state.invoice ? <InvoiceContent invoice={this.state.invoice}/> : null}
            </Modal>
            <Modal
                title={<b className="text-center">Task funding</b>}
                visible={this.state.showModal}
                width={window.innerWidth < 1000 ? "90%" : "30%"}
                onCancel={() => {
                    this.setState({showModal: false})
                }}
                footer={null}
            >
                <div className="padding-sm">
                    <Row>
                        <Col md={8} xs={24}>
                            <b>Select currency</b>
                        </Col>
                        <Col md={16} xs={24}>
                            <Select
                                placeholder="Select currency that you prefer"
                                style={{
                                    width: "100%"
                                }}
                                onSelect={(value) => this.onCurrencySelected(value)}
                            >
                                {currencyTypes.map((option: any, i: number) => {
                                    return <Option className={"padding-sm"} key={i} value={option.option_value}>{option.name}</Option>;
                                })}
                            </Select>
                        </Col>
                    </Row>

                    <Row className="padding-sm"/>

                    <Row>
                        <Col md={8} xs={24}>
                            <b>Amount:</b>
                        </Col>
                        <Col md={16} xs={24}>
                            <Input onChange={this.updatedCurrencyAmount.bind(this)} placeholder="0.25" />
                        </Col>
                    </Row>

                    <Row className="padding-sm"/>

                    <Row className="text-center">
                        <Button
                            loading={this.state.isButtonPressed}
                            disabled={this.state.currencyAmount <= 0 || this.state.selectedCurrency === null}
                            onClick={this.onButtonClicked.bind(this)}
                            type={"primary"}
                        >Support</Button>
                    </Row>
                </div>
            </Modal>
            <Row className="text-center">
                <Button type={"primary"} icon={"heart"} onClick={this.fundButtonClick.bind(this)}>
                    Fund this task!
                </Button>
            </Row>
        </div>;
    }
}

export default NewInvoice;
