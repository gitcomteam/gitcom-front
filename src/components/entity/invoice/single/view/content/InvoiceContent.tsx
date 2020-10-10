import React from "react";
import {InvoiceModel} from "../../../../../../client/bindings";
import {Button, Icon, notification, Row, Tag} from "antd";
import {handleApiError} from "../../../../../../classes/notification/errorHandler/errorHandler";
import copy from 'copy-to-clipboard';
import {CurrencyType} from "../../../../../../client/models";
import dayjs from "dayjs";

interface IProps {
    invoice: InvoiceModel|null,
    showHelpLabel: boolean
}

interface IState {
    isLoaded: boolean,
    invoice: InvoiceModel|null,
}

class InvoiceContent extends React.Component<IProps, IState> {
    public static defaultProps = {
        showHelpLabel: false,
        invoice: null
    };

    constructor(props: IProps) {
        super(props);

        this.state = {
            isLoaded: this.getInvoice() !== null,
            invoice: null
        };
    }

    getInvoice() {
        return (this.state && this.state.invoice) || this.props.invoice;
    }

    updateStatus(newStatus: string) {
        this.setState({
            isLoaded: false
        });
        window.App.apiClient.patchMyInvoice(window.App.apiToken, this.getInvoice()!.guid!, newStatus)
            .then((result) =>
                this.processPatchInvoiceResponse(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processPatchInvoiceResponse(response: any) {
        let json = JSON.parse(response.bodyAsText);

        if (json.data.invoice.status === 'RequiresConfirmation') {
            notification['success']({
                message: 'Invoice payment is pending, it could take up to 24 hours to be confirmed, thanks for your patience'
            });
        }

        this.setState({
            isLoaded: true,
            invoice: json.data.invoice
        });
    }

    copyAddress(address: string) {
        copy(address);
        notification['success']({
            message: 'The address was copied to clipboard',
            description: ''
        });
    }

    getHelpLabel(currencyType: CurrencyType, amount: any = 0) {
        switch (currencyType) {
            case "Usd":
                return `Please send ${amount} US$ to the PayPal email address provided below:`;
            case "BitCoin":
            case "Waves":
            case "LiteCoin":
            case "Ethereum":
                return `Please send ${amount} ${currencyType} to the ${currencyType} address provided below:`;
            case "Erc20Token":
                return `Please send ${amount} Erc20 (Ethereum tokens) to the Ethereum address provided below:`;
            case "WavesToken":
                return `Please send ${amount} Erc20 (Ethereum tokens) to the Ethereum address provided below:`;
        }
        return "";
    }

    render() {
        if (!this.state.isLoaded) {
            return <Icon type="loading" style={{fontSize: "2em"}}/>;
        }

        const invoice = this.getInvoice()!;

        let actionButtons = null;

        if (this.state.isLoaded && invoice.status === "Created") {
            actionButtons = <div>
                <Button
                    className="margin-sm"
                    type={"primary"}
                    onClick={() => this.updateStatus("RequiresConfirmation")}
                >I've paid</Button>
                <Button
                    className="margin-sm"
                    type={"danger"}
                    onClick={() => this.updateStatus("Failed")}
                >Cancel transaction</Button>
            </div>;
        }

        return <div>
            <Row className={"text-left"}>
                {
                    this.props.showHelpLabel ?
                        <p>{this.getHelpLabel(invoice.currency_type!, invoice.amount!)}</p> : null
                }
                <b>Address: </b> {invoice.wallet!.address}
                <Button
                    type="default" icon="copy" className="margin-sm-sides"
                    onClick={() => this.copyAddress(invoice.wallet!.address!)}
                />
                <br/>
                <b>Currency: </b> {invoice.currency_type} <br/>
                <b>Amount: </b> {invoice.amount} <br/>
                <b>Status: </b> <Tag color="blue">{invoice.status}</Tag>
                <br/><br/>
                <b>ID: </b> {invoice.guid} <br/>
                <b>Created at: </b> <br/>
                {dayjs(invoice.created_at).format('MMMM Do YYYY, h:mm:ss a')} <br/>
                <b>Last updated at: </b> <br/>
                {dayjs(invoice.updated_at).format('MMMM Do YYYY, h:mm:ss a')} <br/>
            </Row>
            <Row className="margin-md-top">
                {actionButtons}
            </Row>
        </div>;
    }
}

export default InvoiceContent;
