import React from "react";
import ReactMarkdown from "react-markdown";
import {Card, Divider} from "antd";
import moment from "moment";
import {ProjectPost} from "../../../../client/bindings";
import ProjectLink from "../../../link/projectLink/ProjectLink";

interface IProps {
    post: ProjectPost
}

interface IState {
}

class Post extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        let post = this.props.post;
        return <Card
            title={post.title}
            style={{textAlign: "left", whiteSpace: "pre-wrap"}}
        >
            <ReactMarkdown
                source={post.content}
            />
            <br/>
            <Divider/>
            <ProjectLink projectGuid={post.project_guid!}/>
            <i className={"margin-sm-sides"}>Posted: {moment(post.created_at).format('MMMM Do YYYY')}</i>
        </Card>
    }
}

export default Post;
