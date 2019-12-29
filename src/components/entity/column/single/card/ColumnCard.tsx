import React from 'react';
import {Card, Divider, Icon, Row} from "antd";
import {BoardModel, CardModel, ColumnModel} from "../../../../../client/bindings";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";
import styles from './styles.module.css';
import CardCard from "../../../card/single/card/CardCard";
import {Link} from "react-router-dom";
import PermissionCheck from "../../../../check/permission_check/single/PermissionCheck";
import CreateCard from "../../../card/action/create/CreateCard";

interface IProps {
    parentBoard: BoardModel|null,
    column: ColumnModel
}

interface IState {
    isLoaded: boolean,
    cards: CardModel[]|null
}

class ColumnCard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            cards: null
        }
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.getCards();
        }, Math.floor(Math.random() * 1000));
        setTimeout(() => {
            if (!this.state.isLoaded) {
                this.getCards();
            }
        }, Math.floor(Math.random() * 3000));
    }

    getCards(): void {
        window.App.apiClient.getColumnCards(this.props.column.guid!)
            .then((result) =>
                this.processGetBoardInfo(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetBoardInfo(response: any) {
        let json = JSON.parse(response.bodyAsText);

        this.setState({
            isLoaded: true,
            cards: json.data.cards
        });
    }

    render() {
        return (
            <Card className={styles.root}>
                <b className={"ant-typography"}>{this.props.column.name}</b>
                <Divider/>
                <div className="margin-sm-top text-center">
                    {!this.state.isLoaded ? <Icon type="loading" style={{fontSize: "2em"}}/> : null}
                    {this.state.cards != null && this.state.cards.map((card: CardModel, i: number) => {
                        return <div key={i} className={"margin-md-top"}>
                            <Link to={`${window.location.pathname}?card=${card.guid}`}>
                                <CardCard card={card} parentBoard={this.props.parentBoard}/>
                            </Link>
                        </div>;
                    })}
                </div>
                <PermissionCheck
                    entityGuid={this.props.column.guid!}
                    entityType={"BoardColumn"}
                    requiredPermissions={["write"]}
                >
                    <Row className={"margin-sm"}/>
                    <CreateCard column={this.props.column}/>
                </PermissionCheck>
            </Card>
        );
    }
}

export default ColumnCard;