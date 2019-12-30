import React from "react";
import {Card, Col, Row, Collapse, Icon} from "antd";
import styles from "../auth/login/styles.module.css";
import FullContainerPage from "../../components/layout/simple/fullpage/FullContainerPage";

const { Panel } = Collapse;

interface IProps {
}

interface IState {
}

class HelpLayout extends React.Component<IProps, IState> {
    getContents() {
        return [
            {
                question: "How long it takes for a transaction to be approved?",
                content: <div>
                    For security purposes all current transactions (invoices) are processed manually thus it can take up to 24 hours to confirm your transaction.
                    If it takes longer than that - please send us an email.
                </div>
            },
            {
                question: "As a developer - how can I set up my products that I will sell?",
                content: <div>You need to go to project settings - pricing and set up possible plans there.</div>
            },
            {
                question: "Are there any fees?",
                content: <div>Yes, there are 5% withdrawal fee for all users & developers (excluding payment fee for currencies such as BitCoin)</div>
            }
        ];
    }

    render() {
        return <FullContainerPage>
            <Row type={"flex"} justify={"center"}>
                <Col xxl={16} xl={16} md={20} xs={24} className={styles.verticalCenter}>
                    <Card>
                        <h3 className={"ant-typography"}>Help section <Icon type={"question-circle"}/></h3>
                        <Collapse>
                            {this.getContents().map((question, i: number) => {
                            return <Panel header={question.question} key={i}>
                                <p>{question.content}</p>
                            </Panel>;
                            })}
                        </Collapse>
                    </Card>
                </Col>
            </Row>
        </FullContainerPage>;
    }
}

export default HelpLayout;
