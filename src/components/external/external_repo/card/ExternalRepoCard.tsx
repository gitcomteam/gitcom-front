import React from "react";
import {Button, Card, Col, notification, Row} from "antd";
import {ServiceType1} from "../../../../client/models";
import {ProjectModel} from "../../../../client/bindings";
import {Link} from "react-router-dom";

interface IProps {
    repo: {
        name: string,
        description: string,
        serviceType: ServiceType1,
        originId: string
    }
}

interface IState {
    importButton: {
        isLoading: boolean,
        label: string
    },
    importedProject: ProjectModel|null
}

class ExternalRepoCard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            importButton: {
                isLoading: false,
                label: "Import"
            },
            importedProject: null
        }
    }

    /* TODO: get repo status and if already imported - show 'go to project' button */

    getExternalUrl(): string {
        let repo = this.props.repo;
        return `https://${repo.serviceType}.com/${repo.name}`;
    }

    sendImportRequest() {
        this.setState({
            importButton: {
                label: 'Importing...',
                isLoading: true
            }
        });

        const repo = this.props.repo;
        window.App.apiClient.postImportRepository(
            window.App.apiToken,
            repo.originId,
            repo.serviceType
        )
            .then((res) => {
                const project = JSON.parse(res._response.bodyAsText).data.project;
                if (!project.base_uri) return;
                notification['success']({
                    message: `Project '${project.name}' imported successfully!`
                });
                this.setState({
                    importedProject: project
                });
            })
            .catch((err) => {
                const project = JSON.parse(err.response.body).metadata.project;
                if (!project.base_uri) return;
                this.setState({
                    importedProject: project
                });
            });
    }

    render() {
        let importButton = this.state.importButton;
        const importedProject = this.state.importedProject;

        return <Card className="text-left">
            <Row>
                <Col xs={16}>
                    <b> {this.props.repo.name} </b> <br/>
                    <b>Description:</b> <p className="inline"> {this.props.repo.description} </p> <br/>
                </Col>
                <Col xs={8} className="text-center">
                    <Row>
                        {
                            importedProject ?
                                <div>
                                    <p>Project imported</p>
                                    <Link to={`/${importedProject!.base_uri}`}>
                                        <Button type={"primary"}>Open page</Button>
                                    </Link>
                                </div>
                                :
                                <Button
                                    onClick={() => this.sendImportRequest()}
                                    loading={importButton.isLoading}
                                    type={"primary"}
                                >{importButton.label}</Button>
                        }
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