import React from "react";
import ReactMarkdown from "react-markdown";
import {Card, Divider} from "antd";
import {ProjectPost} from "../../../../client/bindings";
import ProjectLink from "../../../link/projectLink/ProjectLink";
import dayjs from "dayjs";

interface IProps {
    post: ProjectPost
}

class Post extends React.Component<IProps> {
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
            <i className={"margin-sm-sides"}>Posted: {dayjs(post.created_at).format('MMMM Do YYYY')}</i>
        </Card>
    }
}

export default Post;
