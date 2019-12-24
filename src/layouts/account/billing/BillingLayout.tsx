import React from 'react';
import FullPageWithSideBar from "../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import WarningBlock from "../../../components/info/payment/WarningBlock/WarningBlock";
import InvoiceCardsList from "../../../components/entity/invoice/many/Cards/InvoiceCardsList";
import {Row} from "antd";
import UserBalanceCard from "../../../components/entity/user_balance/single/card/UserBalanceCard";

interface IProps {
}

interface IState {
}

class BillingLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {}
    }

    render() {
        return <FullPageWithSideBar sidebarType={"home"}>
            <h3 className={"ant-typography"}>Billing</h3>

            <h4 className={"ant-typography"}>Account balance</h4>

            <UserBalanceCard/>

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