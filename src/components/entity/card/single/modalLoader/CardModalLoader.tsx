import React from "react";
import {CardModel} from "../../../../../client/bindings";
import CardCard from "../card/CardCard";

interface IProps {
    cardGuid: string
}

interface IState {
    card: CardModel|null
}

class CardModalLoader extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            card: null
        }
    }

    componentDidMount(): void {
        this.getCard();
    }

    getCard() {
        window.App.apiClient.getCard(this.props.cardGuid).then(res => {
            let json = JSON.parse(res._response.bodyAsText);
            this.setState({
                card: json.data.card
            });
        })
    }

    render() {
        if (!this.state.card) return null;
        return <div style={{display: "none"}}><CardCard card={this.state.card} forceOpenModal={true}/></div>;
    }
}

export default CardModalLoader;
