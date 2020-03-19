import React from 'react';
import {Button, Card, Divider, Icon, notification, Row} from "antd";
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
    cards: CardModel[]|null,
    lastPageLoaded: number,
    moreAvailable: boolean
}

class ColumnCard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            cards: null,
            lastPageLoaded: 0,
            moreAvailable: true
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

    getCards(page: number = 1): void {
        window.App.apiClient.getColumnCards(this.props.column.guid!, {
            page
        })
            .then((res) => {
                let rawData: any = res.data!;
                if (this.state.cards === null) this.setState({cards: []});
                this.setState({
                    isLoaded: true,
                    cards: this.state.cards!.concat(res.data!.cards!),
                    lastPageLoaded: rawData.meta.current_page
                });
                if (this.state.lastPageLoaded >= rawData.meta.pages_count) {
                    this.setState({moreAvailable: false});
                }
            })
            .catch((error) => handleApiError(error.response));
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
                    {this.state.moreAvailable ? <Button
                        onClick={() => {this.getCards(this.state.lastPageLoaded + 1)}}
                        icon={"plus"}
                    >Load more</Button> : null}
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