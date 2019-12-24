import React from "react";
import {Col, Icon, Row} from "antd";
import {InvoiceModel} from "../../../../../client/bindings";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";
import InvoiceCard from "../../single/view/card/InvoiceCard";

interface IProps {
    // can be "active" or "finished"
    type: string
}

interface IState {
    isLoaded: boolean,
    invoices: InvoiceModel[]
}

class InvoiceCardsList extends React.Component<IProps, IState> {
    public static defaultProps = {
        type: "active"
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            invoices: []
        }
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.getInvoices();
        }, Math.floor(Math.random() * 1500));
    }

    getInvoices() {
        if (this.props.type === "active") {
            window.App.apiClient.getMyActiveInvoices(window.App.apiToken)
                .then((result) =>
                    this.processGetInvoices(result._response))
                .catch((error) => handleApiError(error.response));
        }
        if (this.props.type === "finished") {
            window.App.apiClient.getMyFinishedInvoices(window.App.apiToken)
                .then((result) =>
                    this.processGetInvoices(result._response))
                .catch((error) => handleApiError(error.response));
        }
    }

    processGetInvoices(response: any) {
        let json = JSON.parse(response.bodyAsText);

        this.setState({
            isLoaded: true,
            invoices: json.data.invoices
        });
    }

    getInvoicesBlock() {
        let result : any[] = [];

        let invoices = this.state.invoices;

        if (invoices.length === 0) {
            return [];
        }

        for (let i = 0; i < invoices.length; i++) {
            result.push(<Row key={i}>
                <Col sm={12} xs={24} className="padding-sm">
                    <InvoiceCard invoice={invoices[i]}/>
                </Col>
                {invoices[i+1] ? <Col sm={12} xs={24} className="padding-sm">
                    <InvoiceCard invoice={invoices[i+1]}/>
                </Col> : null}
            </Row>);
            i++;
        }

        return result;
    }

    render() {
        if (!this.state.isLoaded) {
            return <Icon type="loading" style={{fontSize: "2em"}}/>;
        }

        return <div>
            <Row align={"middle"}>
                {this.getInvoicesBlock()}
            </Row>
        </div>;
    }
}

export default InvoiceCardsList;