import React from "react";
import FullPageWithSideBar from "../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import UserBalanceCard from "../../../components/entity/user_balance/single/card/UserBalanceCard";
import {Col, Row} from "antd";
import UserSetting from "../../../components/entity/user_settings/single/UserSetting";
import {Link} from "react-router-dom";
import AuthRedirect from "../../../components/auth/redirect/AuthRedirect";

class SubscriptionLayout extends React.Component {
    constructor(props: any) {
        document.title = "Subscription | GitCom - Community-Driven open source marketplace";
        super(props);
        this.state = {}
    }

    render() {
        return <FullPageWithSideBar sidebarType={"home"}>
            <div>
                <AuthRedirect/>
                <h3 className={"ant-typography"}>Subscription settings</h3>

                <Row className="margin-md-vertical"/>

                <Row>
                    <Col md={12} sm={24}>
                        <h4 className={"ant-typography"}>My balance</h4>
                        <UserBalanceCard/>
                    </Col>
                    <Col md={12} sm={24}>
                        <h4 className={"ant-typography"}>Settings</h4>
                        <p>
                            We will try to charge this amount from your balance each month, this money will be
                            distributed across projects that are in your <Link to={"/account/library"}>library</Link>
                        </p>
                        <Row>
                            <UserSetting
                                settingName={"Subscription currency"}
                                settingKey={"subscription_currency"}
                                allowedValues={["Usd", "BitCoin", "Ethereum", "LiteCoin", "Waves"]}
                                type="select"
                                defaultValue={"string"}
                            />
                        </Row>
                        <Row>
                            <UserSetting
                                settingName={"Subscription amount"}
                                settingKey={"subscription_amount"}
                                type="float"
                                defaultValue={"0.01"}
                            />
                        </Row>
                    </Col>
                </Row>
            </div>
        </FullPageWithSideBar>;
    }
}

export default SubscriptionLayout;
