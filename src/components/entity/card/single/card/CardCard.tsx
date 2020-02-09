import React from 'react';
import {Card, Col, Icon, Modal, Popover, Row} from "antd";
import styles from './styles.module.css';
import EntityBudgetContent from "../../../budget/entity/EntityBudgetContent";
import CardSubmitWorkBlock from "../../../work/single/submit/CardSubmitWorkBlock";
import CardWorkBlock from "../../../work/many/view/CardWorkBlock";
import NewInvoice from "../../../invoice/single/create/NewInvoice";
import MoveCard from "../../action/move/MoveCard";
import {BoardModel, CardModel} from "../../../../../client/bindings";
import PermissionCheck from "../../../../check/permission_check/single/PermissionCheck";
import EditCard from "../../action/edit/EditCard";
import AuthCheck from "../../../../check/auth_check/AuthCheck";
import moment from "moment";
import ReactMarkdown from "react-markdown";

interface IProps {
    parentBoard: BoardModel|null,
    card: CardModel,
}

interface IState {
    showModal: boolean,
    modalCanceled: boolean
}

class CardCard extends React.Component<IProps, IState> {
    public static defaultProps = {
        parentBoard: null
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            showModal: false,
            modalCanceled: false
        }
    }

    componentDidMount(): void {
        let selectedCardGuid = new URL(window.location.href).searchParams.get('card');
        if (selectedCardGuid === this.props.card.guid) {
            this.setState(({
                showModal: true
            }));
        }
    }

    cardOnClick() {
        this.setState({
            showModal: !this.state.showModal
        });
        let newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?card=' + this.props.card.guid;
        window.history.pushState({path:newUrl},'',newUrl);
    }

    render() {
        let card = this.props.card;

        return <div>
            <Card
                className={styles.root + " material-shadow-hover-1"}
                onClick={this.cardOnClick.bind(this)}
            >
                <b className={"ant-typography"}>{card.name}</b>
                <Row className={"text-left margin-sm-top"}>
                    <i>Created: {moment(card.created_at).format('MMMM Do YYYY')}</i>
                </Row>
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
                <PermissionCheck
                    entityGuid={this.props.card.guid!}
                    entityType={"Card"}
                    requiredPermissions={["write"]}
                >
                    <Row type={"flex"}>
                        <b className="margin-sm-sides">Actions:</b>
                        <MoveCard card={this.props.card} parentBoard={this.props.parentBoard}/>
                        <div className="margin-sm-sides"/>
                        <EditCard card={this.props.card}/>
                    </Row>
                </PermissionCheck>
                <Row className="margin-md-top"/>

                <ReactMarkdown
                    source={card.description ? card.description : "no content"}
                />

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
                        <AuthCheck>
                            <Row className="padding-sm"/>
                            <NewInvoice
                                modalLabel={'Task funding'}
                                entityGuid={card.guid!}
                                entityType={'Card'}
                                buttonIcon={"heart"}
                                buttonLabel={"Fund this task"}
                            />
                        </AuthCheck>
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