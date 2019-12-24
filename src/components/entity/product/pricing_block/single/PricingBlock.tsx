import React from "react";
import {Card, Divider} from "antd";
import AuthCheck from "../../../../check/auth_check/AuthCheck";
import NewInvoice from "../../../invoice/single/create/NewInvoice";

interface IProps {
    guid: string,
    title: string,
    price: number,
    description: string,
    subscription: boolean,
    showActionButton: boolean
}

interface IState {
}

class PricingBlock extends React.Component<IProps, IState> {
    public static defaultProps = {
        subscription: false,
        showActionButton: true
    };

    getSubscriptionLabel() {
        return this.props.subscription ? " per month" : null
    }

    render() {
        return <Card>
            <h4 className={"ant-typography"}>{this.props.title}</h4>
            <Divider/>
            {
                this.props.price > 0 ?
                    <p><b>Price:</b> {this.props.price}$ {this.getSubscriptionLabel()}</p> :
                    <b>Open source & free</b>
            }
            <p>{this.props.description}</p>
            { this.props.showActionButton ?
                <AuthCheck>
                    <NewInvoice
                        modalLabel={"Product purchase"}
                        defaultAmount={this.props.price}
                        entityGuid={this.props.guid}
                        entityType={'ProjectProductPurchase'}
                    />
                </AuthCheck> : null
            }
        </Card>;
    }
}

export default PricingBlock;