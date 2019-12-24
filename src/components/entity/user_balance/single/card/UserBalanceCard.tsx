import React from "react";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";
import {UserBalanceModel} from "../../../../../client/bindings";
import {Card, Icon, Table} from "antd";
import {ColumnProps} from "antd/es/table";

interface IProps {
}

interface IState {
    isLoaded: boolean,
    balances: UserBalanceModel[],
}

class UserBalanceCard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            balances: []
        }
    }

    componentDidMount(): void {
        this.getBalances();
    }

    getBalances() {
        window.App.apiClient.getMyBalances(window.App.apiToken)
            .then((result) =>
                this.processGetBalances(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetBalances(response: any) {
        let json = JSON.parse(response.bodyAsText);

        let balances = json.data.balances;

        let i = 0;

        balances.forEach((balance: any) => {
            balance.key = i;
            ++i;
        });

        this.setState({
            isLoaded: true,
            balances: balances
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
                title: 'Balance',
                dataIndex: 'balance',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.amount - b.amount,
            }
        ];

        if (!this.state.isLoaded) {
            return <Icon type="loading" style={{fontSize: "2em"}}/>
        }
        return <div>
            <Card className="text-left">
                <Table columns={tableColumns} dataSource={this.state.balances} pagination={false}/>
            </Card>
        </div>;
    }
}

export default UserBalanceCard;
