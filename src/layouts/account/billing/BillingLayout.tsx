import React from 'react';
import FullPageWithSideBar from "../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import WarningBlock from "../../../components/info/payment/WarningBlock/WarningBlock";
import InvoiceCardsList from "../../../components/entity/invoice/many/Cards/InvoiceCardsList";
import {Row} from "antd";
import UserBalanceCard from "../../../components/entity/user_balance/single/card/UserBalanceCard";
import NewInvoice from "../../../components/entity/invoice/single/create/NewInvoice";
import AuthRedirect from "../../../components/auth/redirect/AuthRedirect";

interface IProps {
}

interface IState {
    isUserLoaded: boolean
}

class BillingLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isUserLoaded: false
        }
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.setState({
                isUserLoaded: window.App.authorizedUser !== null
            });
        },750);
    }

    render() {
        return <FullPageWithSideBar sidebarType={"home"}>
            <AuthRedirect/>
            <h3 className={"ant-typography"}>Billing</h3>

            <h4 className={"ant-typography"}>Account balance</h4>

            <UserBalanceCard/>

            {
                this.state.isUserLoaded ? <Row className="margin-sm-top">
                    <NewInvoice
                        modalLabel={"Deposit to my account"}
                        buttonLabel={"Deposit"}
                        defaultAmount={0.5}
                        entityGuid={window.App.authorizedUser!.guid!}
                        entityType={'User'}
                    />
                </Row> : null
            }

            <WarningBlock/>

            <h4 className={"ant-typography"}>Active invoices</h4>
            <InvoiceCardsList/>

            <Row className="padding-md"/>

            <h4 className={"ant-typography"}>Completed invoices</h4>
            <InvoiceCardsList type={"finished"}/>
        </FullPageWithSideBar>;
    }
}

export default BillingLayout;