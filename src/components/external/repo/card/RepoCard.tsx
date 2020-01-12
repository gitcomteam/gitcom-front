import React from "react";
import {ProjectModel} from "../../../../client/bindings";
import {Button, Card, Icon, Row} from "antd";
import {handleApiError} from "../../../../classes/notification/errorHandler/errorHandler";

interface IProps {
    project: ProjectModel,
}

interface IState {
    isLoaded: boolean,
    repository_url: string
}

class RepoCard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            repository_url: "#"
        }
    }

    componentDidMount(): void {
        window.App.apiClient.getRepo(this.props.project.repository_guid!)
            .then((res) => {
                let json = JSON.parse(res._response.bodyAsText);
                console.log(json.data.repository);
                this.setState({
                    isLoaded: true,
                    repository_url: json.data.repository.repo_url
                });
            })
            .catch((error) => handleApiError(error.response));
    }

    render() {
        return <Card>
            <h3 className={"ant-typography"}><Icon type={"github"}/> Repository</h3>
            <Row>
                <a target="_blank" rel="noopener noreferrer" href={this.state.repository_url}>
                    <Button type={"default"}>View on GitHub</Button>
                </a>
            </Row>
        </Card>
    }
}

export default RepoCard;