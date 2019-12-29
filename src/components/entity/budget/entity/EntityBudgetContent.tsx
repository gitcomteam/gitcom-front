import React from "react";
import {handleApiError} from "../../../../classes/notification/errorHandler/errorHandler";
import {EntityType} from "../../../../client/models";
import {FundingBalance} from "../../../../client/bindings";
import {Icon, Table} from "antd";
import {ColumnProps} from "antd/es/table";

interface IProps {
    entityGuid: string,
    entityType: EntityType
}

interface IState {
    isLoaded: boolean,
    balances: FundingBalance[],
    balancesTableData: any[]
}

class EntityBudgetContent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            balances: [],
            balancesTableData: []
        }
    }

    componentDidMount(): void {
        this.getData();
    }

    getData(): void {
        window.App.apiClient.entityType = this.props.entityType;
        window.App.apiClient.getEntityFundingBalances(this.props.entityGuid)
            .then((result) =>
                this.processResponse(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processResponse(response: any) {
        let json = JSON.parse(response.bodyAsText);

        this.setState({
            isLoaded: true,
            balances: json.data.balances
        });

        this.prepareTableData();
    }

    prepareTableData(): void {
        let tableData: any[] = [];

        this.state.balances.forEach((balance: any, i: number) => {
            balance.key = i;
            tableData.push(balance);
        });

        this.setState({
            balancesTableData: tableData
        });
    }

    render() {
        const tableColumns: ColumnProps<any>[] = [
            {
                title: 'Currency',
                dataIndex: 'currency_type',
                sorter: (a: any, b: any) => a.name - b.name,
                sortDirections: ['descend'],
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.amount - b.amount,
            }
        ];

        return <div className={"text-center"}>
            {!this.state.isLoaded ? <Icon type="loading" style={{fontSize: "2em"}}/> : null}
            {this.state.isLoaded && this.state.balances.length === 0 ? <p>No budget for this item</p> : null}
            {this.state.balances.length > 0 ?
                <Table columns={tableColumns} dataSource={this.state.balancesTableData} pagination={false}/> : null
            }
        </div>;
    }
}

export default EntityBudgetContent;