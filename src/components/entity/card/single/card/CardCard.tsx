import React from 'react';
import {Card, Col, Icon, Modal, Popover, Row} from "antd";
import {CardModel} from "../../../../../client/bindings";
import styles from './styles.module.css';
import EntityBudgetContent from "../../../budget/entity/EntityBudgetContent";
import CardSubmitWorkBlock from "../../../work/single/submit/CardSubmitWorkBlock";
import CardWorkBlock from "../../../work/many/view/CardWorkBlock";
import NewInvoice from "../../../invoice/single/create/NewInvoice";

interface IProps {
    card: CardModel
}

interface IState {
    showModal: boolean,
    modalCanceled: boolean
}

class CardCard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            showModal: false,
            modalCanceled: false
        }
    }

    cardOnClick() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    render() {
        let card = this.props.card;

        return <div>
            <Card
                className={styles.root + " material-shadow-hover-1"}
                onClick={this.cardOnClick.bind(this)}
            >
                <h4 className={"ant-typography"}>{card.name}</h4>

                <div className="margin-sm-top">
                    cards here
                </div>
            </Card>
            <Modal
                title={<b className="text-center">{card.name}</b>}
                visible={this.state.showModal}
                width={window.innerWidth < 1000 ? "90%" : "60%"}
                onCancel={() => {
                    this.setState({showModal: false})
                }}
                footer={null}
            >
                <h4 className={"ant-typography text-center"}>Content</h4>
                <p>{card.description ? card.description : "no content"}</p>

                <Row className="margin-lg-top">
                    <Col md={12} xs={24} className={"padding-md"}>
                        <b className={"ant-typography text-center"}>
                            <div className="inline padding-sm">Budget</div>
                            <Popover
                                content={<p>
                                    Budget will be distributed only after card is closed. Funds will go to all
                                    participants
                                    who have approved work in this card.
                                </p>}
                                title={<b>How funds are distributed</b>}
                            >
                                <Icon type={"info-circle"}/>
                            </Popover>
                        </b>
                        <EntityBudgetContent entityGuid={card.guid!} entityType={"Card"}/>
                        <Row className="padding-sm"/>
                        <NewInvoice card={card}/>
                    </Col>
                    <Col md={12} xs={24} className={"padding-md"}>
                        <h4 className={"ant-typography text-center"}>Submitted work <Icon type="clock-circle"/></h4>
                        <CardSubmitWorkBlock card={card}/>
                        <Row className="padding-sm"/>
                        <CardWorkBlock card={card}/>
                    </Col>
                </Row>

                {/* card history component */}
            </Modal>
        </div>;
    }
}

export default CardCard;