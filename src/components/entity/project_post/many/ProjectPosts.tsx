import React from "react";
import {ProjectPost} from "../../../../client/bindings";
import {Icon, Row} from "antd";
import Post from "../single/Post";

interface IProps {
    projectGuid: string|null
}

interface IState {
    isLoading: boolean,
    posts: ProjectPost[]|null
}

class ProjectPosts extends React.Component<IProps, IState> {
    public static defaultProps = {
        projectGuid: null
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoading: true,
            posts: null
        };
    }

    componentDidMount() {
        if (this.props.projectGuid) {
            window.App.apiClient.getProjectPosts(this.props.projectGuid).then(res => {
                let posts = JSON.parse(res._response.bodyAsText).data.posts.sort((a: ProjectPost, b: ProjectPost) => {
                    return new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime();
                });
                this.setState({
                    isLoading: false,
                    posts
                });
            });
        } else {
            window.App.apiClient.getLatestProjectsPosts().then(res => {
                let posts = JSON.parse(res._response.bodyAsText).data.posts.sort((a: ProjectPost, b: ProjectPost) => {
                    return new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime();
                });
                this.setState({
                    isLoading: false,
                    posts
                });
            });
        }
    }

    render() {
        if (this.state.isLoading) return <Icon type="loading" style={{fontSize: "2em"}}/>;

        return <div>
            {
                this.state.posts!.map((currentPost: ProjectPost) => {
                    return <Row key={currentPost.guid} className={"margin-sm-top"}>
                        <Post post={currentPost}/>
                    </Row>
                })
            }
        </div>
    }
}

export default ProjectPosts;
