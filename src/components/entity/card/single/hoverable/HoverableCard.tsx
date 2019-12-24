import React from "react";
import {Card} from "antd";

class HoverableCard extends React.Component {
    render() {
        return <Card className="hover-pointer material-shadow-hover-1">{this.props.children}</Card>
    }
}

export default HoverableCard;