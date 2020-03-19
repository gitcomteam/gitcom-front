import {Image, ProjectModel} from "../../../../../client/bindings";
import React from "react";
import {Link} from "react-router-dom";
import {Card} from "antd";
import ProjectInfo from "../info/ProjectInfo";

interface IProps {
    project: ProjectModel,
}

interface IState {
    image: Image|null
}

class ProjectCard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            image: null
        }
    }

    componentDidMount() {
        setTimeout(() => {
            window.App.apiClient.getProjectImages(this.props.project.guid!)
                .then((res: any) => {
                    let images = JSON.parse(res._response.bodyAsText).data.images;
                    if (images.length > 0) this.setState({
                        image: images[0]
                    });
                });
        }, 750);
    }

    render() {
        const project = this.props.project;

        let cardImage = <div/>;
        if (this.state.image) cardImage = <img alt="example" src={this.state.image!.url}/>;

        return <Card
            className="hover-pointer material-shadow-hover-1"
            title={<Link to={"/" + project.base_uri}>{project.name}</Link>}
            cover={cardImage}
        >
            <ProjectInfo project={project}/>
        </Card>;
    }
}

export default ProjectCard;
