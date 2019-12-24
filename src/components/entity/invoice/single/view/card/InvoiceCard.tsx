import React from "react";
import {InvoiceModel} from "../../../../../../client/bindings";
import {Card, Icon} from "antd";
import InvoiceContent from "../content/InvoiceContent";
import {handleApiError} from "../../../../../../classes/notification/errorHandler/errorHandler";

interface IProps {
    guid: string|null,
    invoice: InvoiceModel|null
}

interface IState {
    isLoaded: boolean,
    invoice: InvoiceModel|null
}

class InvoiceCard extends React.Component<IProps, IState> {
    public static defaultProps = {
        guid: null,
        invoice: null
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            invoice: null
        };
    }

    componentDidMount(): void {
        if (this.props.invoice) {
            this.setState({
                isLoaded: true,
                invoice: this.props.invoice
            });
        } else {
            this.getInvoice();
        }
    }

    getInvoice(): void {
        window.App.apiClient.getMyInvoice(window.App.apiToken, this.props.guid!)
            .then((result) => this.processGetInvoice(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetInvoice(response: any): void {
        const json = JSON.parse(response.bodyAsText);
        this.setState({
            isLoaded: true,
            invoice: json.data.invoice
        });
    }

    render() {
        return <Card className="material-shadow-hover-1">
            {this.state.isLoaded ? <InvoiceContent invoice={this.state.invoice!}/> :
                <Icon type="loading" style={{fontSize: "2em"}}/>}
        </Card>;
    }
}
export default InvoiceCard;
