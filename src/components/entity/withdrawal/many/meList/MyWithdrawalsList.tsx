import React from "react";
import {WithdrawalRequest} from "../../../../../client/bindings";
import {Icon, Table} from "antd";
import {ColumnProps} from "antd/es/table";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";

interface IProps {
}

interface IState {
    isLoaded: boolean,
    withdrawals: WithdrawalRequest[]|null
}

class MyWithdrawalsList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            withdrawals: null
        }
    }

    componentDidMount(): void {
        window.App.apiClient.getMyWithdrawalRequests(window.App.apiToken)
            .then((res) => {
                let json = JSON.parse(res._response.bodyAsText);
                json.data.withdraw_requests = json.data.withdraw_requests.map((item: any) => {
                    item.key = `withdraw_request_${item.guid}`;
                    return item;
                });
                this.setState({
                    isLoaded: true,
                    withdrawals: json.data.withdraw_requests
                });
            })
            .catch((error) => handleApiError(error.response));
    }

    render() {
        if (!this.state.isLoaded) return <Icon type="loading" style={{fontSize: "2em"}}/>;

        const tableColumns: ColumnProps<any>[] = [
            {
                title: 'Id',
                dataIndex: 'guid'
            },
            {
                title: 'Address',
                dataIndex: 'address'
            },
            {
                title: 'Currency',
                dataIndex: 'currency_type'
            },
            {
                title: 'Amount',
                dataIndex: 'amount'
            },
            {
                title: 'Is paid',
                dataIndex: 'paid',
                render: isPaid => isPaid ? 'Paid' : 'Waiting for confirmation',
            },
            {
                title: 'Date',
                dataIndex: 'created_at',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
            }
        ];

        return <div>
            <Table columns={tableColumns} dataSource={this.state.withdrawals!} pagination={false}/>
        </div>
    }
}

export default MyWithdrawalsList;
