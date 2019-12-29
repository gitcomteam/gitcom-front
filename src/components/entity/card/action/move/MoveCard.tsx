import {BoardModel, CardModel, ColumnModel} from "../../../../../client/bindings";
import React from "react";
import {Button, Icon, notification, Row, Select} from "antd";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";

const { Option } = Select;

interface IProps {
    parentBoard: BoardModel|null,
    card: CardModel
}

interface IState {
    boardColumns: ColumnModel[]|null
    selectedColumnGuid: string|null,

    isSelected: boolean,

    requestSent: boolean,

    columnsLoaded: boolean,
    cardMoved: boolean
}

class MoveCard extends React.Component<IProps, IState> {
    public static defaultProps = {
        parentBoard: null
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            boardColumns: null,

            isSelected: false,
            columnsLoaded: false,
            selectedColumnGuid: null,

            requestSent: false,

            cardMoved: true
        }
    }

    getBoardColumns(): void {
        if (!this.props.parentBoard) {
            console.log('exit!');
            return;
        }
        window.App.apiClient.getBoardColumns(this.props.parentBoard!.guid!)
            .then((result) =>
                this.processGetBoardColumns(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetBoardColumns(response: any) {
        let json = JSON.parse(response.bodyAsText);
        this.setState({
            boardColumns: json.data.board_columns,
            selectedColumnGuid: json.data.board_columns[0].guid,
            columnsLoaded: true,
        });
    }

    buttonClicked() {
        this.setState({
            isSelected: true
        });
        this.getBoardColumns();
    }

    selectColumn(guid: string) {
        this.setState({
            selectedColumnGuid: guid
        });
    }

    moveCardRequest() {
        if (!this.state.selectedColumnGuid) {
            return;
        }
        window.App.apiClient.editCard(window.App.apiToken, this.props.card.guid!, {
            columnGuid: this.state.selectedColumnGuid!
        })
            .then((result) =>
                this.processCardUpdated())
            .catch((error) => handleApiError(error.response));
        this.setState({
            requestSent: true
        });
    }

    processCardUpdated() {
        notification['success']({
            message: 'Card updated!',
            description: ''
        });
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

    render() {
        if (!this.state.isSelected) {
            return <Button
                icon={"swap"}
                onClick={this.buttonClicked.bind(this)}
            >Move</Button>;
        }
        if (!this.state.columnsLoaded || !this.state.boardColumns) {
            return <Icon type="loading" style={{fontSize: "2em"}}/>;
        }
        return <Row type={"flex"}>
            <b>Select column:</b>
            <Select
                className={"select-padding"}
                style={{padding: "0 25px"}}
                defaultValue={this.props.card.column_guid}
                onChange={this.selectColumn.bind(this)}
            >
                {this.state.boardColumns!.map((column: ColumnModel) => {
                    return <Option key={column.guid}>{column.name}</Option>;
                })}
            </Select>
            <Button
                icon={"swap"}
                onClick={this.moveCardRequest.bind(this)}
                loading={this.state.requestSent}
            >Move</Button>
        </Row>;
    }
}

export default MoveCard;
