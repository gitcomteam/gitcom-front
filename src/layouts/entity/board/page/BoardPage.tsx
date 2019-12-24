import React from "react";
import FullPageWithSideBar from "../../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import {handleApiError} from "../../../../classes/notification/errorHandler/errorHandler";
import {BoardModel, ColumnModel} from "../../../../client/bindings";
import {Breadcrumb, Divider, Icon, Row} from "antd";
import {Link} from "react-router-dom";
import ColumnCard from "../../../../components/entity/column/single/card/ColumnCard";
import styles from './styles.module.css';

interface IProps {
    match: {
        params: {
            owner: string,
            alias: string,
            boardGuid: string
        }
    }
}

interface IState {
    isLoaded: boolean,
    board: BoardModel|null,
    columns: ColumnModel[]|null
}

class BoardPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            board: null,
            columns: null
        };
    }

    componentDidMount(): void {
        this.getBoardInfo();
    }

    getBoardInfo(): void {
        window.App.apiClient.getBoard(this.props.match.params.boardGuid)
            .then((result) =>
                this.processGetBoardInfo(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetBoardInfo(response: any) {
        let json = JSON.parse(response.bodyAsText);

        this.setState({
            isLoaded: true,
            board: json.data.board
        });

        this.getBoardColumns();
    }

    getBoardColumns(): void {
        window.App.apiClient.getBoardColumns(this.props.match.params.boardGuid)
            .then((result) =>
                this.processGetBoardColumns(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetBoardColumns(response: any) {
        let json = JSON.parse(response.bodyAsText);

        this.setState({
            columns: json.data.board_columns
        });
    }

    render() {
        let urlParams = this.props.match.params;

        let breadCrumb = <Row className="text-left">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={'/' + urlParams.owner + '/' + urlParams.alias + '/'}>{urlParams.alias}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>This board</Breadcrumb.Item>
            </Breadcrumb>
        </Row>;

        if (!this.state.isLoaded || !this.state.board) {
            return <FullPageWithSideBar sidebarType={"project"}>
                {breadCrumb}
                <h3 className={"ant-typography"}>Loading project info</h3>
                <Icon type="loading" style={{fontSize: "2em"}}/>
            </FullPageWithSideBar>;
        }

        let board = this.state.board;

        return <FullPageWithSideBar sidebarType={"board"}>
            {breadCrumb}
            <h2 className={"ant-typography"}>{board.name}</h2>
            <p>{board.description}</p>
            <Divider/>

            <div className={styles.columnsBlock}>
                {this.state.columns != null && this.state.columns.map((column: ColumnModel, i: number) => {
                    return <div key={i} className={styles.columnBlock + " padding-sm"}>
                        <ColumnCard column={column}/>
                    </div>;
                })}
            </div>
        </FullPageWithSideBar>;
    }
}

export default BoardPage;
