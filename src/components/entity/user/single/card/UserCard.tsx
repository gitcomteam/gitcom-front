import React from "react";
import {Card, Icon} from "antd";
import {UserModel} from "../../../../../client/bindings";

interface IProps {
    guid: string|null,
    user: UserModel|null
    me: boolean
}

interface IState {
    user: UserModel|null
}

class UserCard extends React.Component<IProps, IState> {
    public static defaultProps = {
        guid: null,
        user: null,
        me: false
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount(): void {
        if (this.props.me) {
            setTimeout(() => {
                this.setState({
                    user: window.App.authorizedUser
                });
            }, 750);
        }
    }

    render() {
        let user = this.props.user || this.state.user;

        if (!user) {
            return <Icon type="loading" style={{fontSize: "2em"}}/>
        }

        return <Card className="text-left">
            <b><Icon type={"user"}/>{user!.login!}</b><br/>
            <b>Joined at: </b><p className="inline">{user!.register_date}</p>
        </Card>;
    }
}

export default UserCard;
