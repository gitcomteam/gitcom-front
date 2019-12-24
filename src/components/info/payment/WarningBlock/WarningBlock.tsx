import React from "react";
import {Card, Icon, Row} from "antd";

class WarningBlock extends React.Component {
    render() {
        return <div className="margin-md-vertical text-left">
            <Card>
                <Row className="text-center">
                    <span className="ant-typography ant-typography-danger"><b><Icon type="warning"/>Warning!</b></span>
                </Row>
                <p>
                    Please make sure that provided address is correct. We won't be able to recover your funds if you will
                    send them to an invalid address
                    <br/>
                    If you have any questions regarding your invoices please send us your invoice details (at least ID)
                    to <u>payments@gitcom.org</u>
                </p>
            </Card>
        </div>
    }
}

export default WarningBlock;