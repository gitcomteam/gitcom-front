import React from "react";
import {Button, Card, Col, Row} from "antd";
import {Link} from "react-router-dom";
import {buildQuery} from "../../../../classes/utils/url/QueryBuilder";

interface IProps {
    repo: {
        name: string,
        description: string,
        serviceType: string,
        originId: string
    }
}

interface IState {}

class ExternalRepoCard extends React.Component<IProps, IState> {
    getImportUrl(): string {
        return "/user/repository/import?" + buildQuery({
            origin_id: this.props.repo.originId,
            service_type: this.props.repo.serviceType
        });
    }

    getExternalUrl(): string {
        let repo = this.props.repo;
        return `https://${repo.serviceType}.com/${repo.name}`;
    }

    render() {
        return <Card className="text-left">
            <Row>
                <Col xs={16}>
                    <b> {this.props.repo.name} </b> <br/>
                    <b>Description:</b> <p className="inline"> description here </p> <br/>
                    <b>Status:</b> <p className="inline"> unknown </p>
                </Col>
                <Col xs={8} className="text-center">
                    <Row>
                        <Link to={this.getImportUrl()}><Button type={"primary"}>Import</Button></Link>
                    </Row>
                    <Row className="margin-sm-top">
                        <a target="_blank" rel="noopener noreferrer" href={this.getExternalUrl()}><Button
                            type={"default"}>View on {this.props.repo.serviceType}</Button></a>
                    </Row>
                </Col>
            </Row>
        </Card>
    }
}

export default ExternalRepoCard;