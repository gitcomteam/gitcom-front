import React from "react";
import {Link} from "react-router-dom";
import {Icon} from "antd";

interface IProps {
    userGuid: string
}

interface IState {
    isLoaded: boolean
}

class UserLink extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.getUserInfo();
        }, Math.floor(Math.random() * 1000));
    }

    getUserInfo() {
        // window.App.apiClient.getCardWork(this.props.card.guid!)
        //     .then((result) =>
        //         this.processGetWorkResponse(result))
        //     .catch((error) => handleApiError(error.response));
    }

    render() {
        return <div>
            <Icon type={"user"}/>
            <Link to={"/someuser"}>Some user</Link>
        </div>;
    }
}

export default UserLink;