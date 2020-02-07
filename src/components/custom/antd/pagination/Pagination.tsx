import React from "react";
import {Pagination as AntPagination} from "antd";

interface IProps {
    currentPage: number,
    pagesCount: number,
    onChange: any,
}

interface IState {
}

class Pagination extends React.Component<IProps, IState> {
    componentDidUpdate(): void {
        let pageButtons = document.getElementsByClassName("ant-pagination-item");
        for (let i = 0; i <= pageButtons.length; i++) {
            if (pageButtons[i]) {
                let pageNum = pageButtons[i].getAttribute('title');
                pageButtons[i].innerHTML = `<a href="?page=${pageNum}">${pageNum}</a>`;
            }
        }
    }

    render() {
        return <AntPagination
            current={this.props.currentPage}
            onChange={(page: number) => this.props.onChange(page)}
            pageSize={1}
            total={this.props.pagesCount}
        />
    }
}

export default Pagination;
