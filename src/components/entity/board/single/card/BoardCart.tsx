import React from 'react';
import {Card} from "antd";
import {BoardModel} from "../../../../../client/bindings";
import {Link} from "react-router-dom";

interface IProps {
    fullProjectName: string|null,
    board: BoardModel
}

interface IState {

}

class BoardCard extends React.Component<IProps, IState> {
    render() {
        let board = this.props.board;

        return (
            <Link to={"/" + this.props.fullProjectName + "/board/" + board.guid}>
                <Card className="material-shadow-hover-1">
                    <h4 className={"ant-typography"}>{this.props.board.name}</h4>
                    <p>{this.props.board.description}</p>

                    <div className="text-left margin-sm-top">
                        <b>Last updated at: </b> {this.props.board.updated_at}
                    </div>
                </Card>
            </Link>
        );
    }
}

export default BoardCard;