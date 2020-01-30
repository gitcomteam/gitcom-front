import React from "react";
import FullPageWithSideBar from "../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import UserBalanceCard from "../../../components/entity/user_balance/single/card/UserBalanceCard";
import MyWithdrawalsList from "../../../components/entity/withdrawal/many/meList/MyWithdrawalsList";
import {Row} from "antd";
import NewWithdrawalButton from "../../../components/entity/withdrawal/action/new/NewWithdrawalButton";
import AuthRedirect from "../../../components/auth/redirect/AuthRedirect";

class WithdrawalsLayout extends React.Component {
    render() {
        return <FullPageWithSideBar sidebarType={"home"}>
            <AuthRedirect/>
            <h3 className={"ant-typography"}>Withdrawal requests</h3>

            <h4 className={"ant-typography"}>Account balance</h4>

            <UserBalanceCard/>
            <Row className="margin-sm-top">
                <b>Note:</b> there are 5% withdrawal fee for all users & developers
            </Row>
            <Row className="margin-sm-top">
                <NewWithdrawalButton/>
            </Row>

            <h3 className={"ant-typography margin-lg-top"}>Withdrawals list:</h3>
            <MyWithdrawalsList/>
        </FullPageWithSideBar>
    }
}

export default WithdrawalsLayout;
