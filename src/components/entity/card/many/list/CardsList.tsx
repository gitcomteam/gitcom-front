import React from "react";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";
import {Col, Icon, Row} from "antd";
import {CardModel} from "../../../../../client/bindings";
import {Link} from "react-router-dom";
import CardCard from "../../single/card/CardCard";
import Pagination from "../../../../custom/antd/pagination/Pagination";
import CardModalLoader from "../../single/modalLoader/CardModalLoader";

interface IProps {
    dataSource: string
}

interface IState {
    currentPage: number,
    pagesCount: number,
    isLoaded: boolean,
    cards: CardModel[]|null,
    openedCardGuid: string|null
}

class CardsList extends React.Component<IProps, IState> {
    public static defaultProps = {
        dataSource: ""
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            currentPage: 1,
            pagesCount: 1,
            isLoaded: false,
            cards: null,
            openedCardGuid: null
        }
    }

    componentDidMount(): void {
        setTimeout(() => {
            let queryPage: any = new URL(window.location.href).searchParams.get('page');
            if (queryPage) {
                queryPage = parseInt(queryPage) ? parseInt(queryPage) : null;
                this.setState({currentPage: queryPage});
            }
            let openedCardGuid : string|null = new URL(window.location.href).searchParams.get('card');
            if (openedCardGuid) this.setState({ openedCardGuid });
            this.getCards();
        }, 50);
    }

    getCards(): void {
        this.setState({isLoaded: false, cards: null});
        switch (this.props.dataSource) {
            case "allCards":
                window.App.apiClient.getCards({page: this.state.currentPage}).then((res: any) => {
                    let json = JSON.parse(res._response.bodyAsText);
                    this.setState({
                        isLoaded: true,
                        cards: json.data.cards,
                        pagesCount: json.data.meta.pages_count
                    })
                }).catch((error) => handleApiError(error.response));
                break;
        }
    }

    changePage(page: number) {
        this.setState({currentPage: page});
        this.getCards();
    }

    render() {
        if (!this.state.isLoaded || !this.state.cards) return <Icon type="loading" style={{fontSize: "2em"}}/>;
        return <div>
            {this.state.openedCardGuid ? <CardModalLoader cardGuid={this.state.openedCardGuid}/> : null}
            <Row type={"flex"}>
                {this.state.cards != null && this.state.cards.map((card: CardModel, i: number) => {
                    return <Col sm={12} xs={24} key={i} className={"margin-md-top padding-sm"}>
                        <Link to={`${window.location.pathname}?card=${card.guid}`}>
                            <CardCard card={card} autoOpenModal={false}/>
                        </Link>
                    </Col>;
                })}
            </Row>
            <Pagination
                currentPage={this.state.currentPage}
                pagesCount={this.state.pagesCount}
                onChange={this.changePage.bind(this)}
            />
        </div>
    }
}

export default CardsList;
