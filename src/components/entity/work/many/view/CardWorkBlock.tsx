import React from "react";
import {CardModel, CardWork} from "../../../../../client/bindings";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";
import {Card, Col, Divider, Icon, Row, Tag} from "antd";
import styles from "../../../../../layouts/entity/board/page/styles.module.css";
import UserLink from "../../../user/single/link/UserLink";

interface IProps {
    card: CardModel
}

interface IState {
    isLoaded: boolean,
    workItems: CardWork[]
}

class CardWorkBlock extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            workItems: []
        };
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.getSubmittedWork();
        }, Math.floor(Math.random() * 1000));
    }

    getSubmittedWork(): void {
        window.App.apiClient.getCardWork(this.props.card.guid!)
            .then((result) =>
                this.processGetWorkResponse(result))
            .catch((error) => handleApiError(error.response));
    }

    processGetWorkResponse(response: any): void {
        let json : any = JSON.parse(response._response.bodyAsText);

        this.setState({
            isLoaded: true,
            workItems: json.data.work_items.sort(function(a :CardWork ,b :CardWork) {
                return new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime();
            })
        });
    }

    render() {
        if (!this.state.isLoaded) {
            return <div className="padding-sm text-center">
                <Icon type="loading" style={{fontSize: "2em"}}/>
            </div>;
        }

        return <div className="padding-sm text-center">
            {this.state.workItems.length === 0 ? <p>No work submitted</p> : null}
            {this.state.workItems.map((item: CardWork, i: number) => {
                return <div key={i} className={styles.columnBlock + " margin-md-top full-width"}>
                    <Card title={
                        <Row>
                            <Col md={8} xs={24}>
                                <UserLink userGuid={item.user_guid!}/>
                            </Col>
                            <Col md={16} xs={24} className="display-flex">
                                <Tag className="flex-1" color="blue">{item.work_type!.title}</Tag>
                                {item.created_at}
                            </Col>
                        </Row>
                    } className="small-card material-shadow-hover-1">
                        <Row className="text-left margin-sm-top">
                            <b>Status:</b> <p className="inline">waiting for approval</p>
                        </Row>
                        <Divider/>
                        <b>Proof:</b>
                        <p>{item.proof!.substring(0, 100)}</p>
                    </Card>
                </div>;
            })}
        </div>;
    }
}

export default CardWorkBlock;