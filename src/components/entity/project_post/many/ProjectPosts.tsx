import React from "react";
import {ProjectPost} from "../../../../client/bindings";
import {Card, Divider, Icon, Row} from "antd";
import moment from "moment";

interface IProps {
    projectGuid: string
}

interface IState {
    isLoading: boolean,
    posts: ProjectPost[]|null
}

class ProjectPosts extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoading: true,
            posts: null
        };
    }

    componentDidMount() {
        window.App.apiClient.getProjectPosts(this.props.projectGuid).then(res => {
            let posts = JSON.parse(res._response.bodyAsText).data.posts.sort((a: ProjectPost, b: ProjectPost) => {
                return new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime();
            });
            this.setState({
                isLoading: false,
                posts
            });
        });
    }

    render() {
        if (this.state.isLoading) return <Icon type="loading" style={{fontSize: "2em"}}/>

        return <div>
            {
                this.state.posts!.map((post: ProjectPost) => {
                    return <Row key={post.guid} className={"margin-sm-top"}>
                        <Card
                            title={post.title}
                            style={{textAlign: "left", whiteSpace: "pre-wrap"}}
                        >
                            {post.content}
                            <br/>
                            <Divider/>
                            <i>Posted: {moment(post.created_at).format('MMMM Do YYYY')}</i>
                        </Card>
                    </Row>
                })
            }
        </div>
    }
}

export default ProjectPosts;
