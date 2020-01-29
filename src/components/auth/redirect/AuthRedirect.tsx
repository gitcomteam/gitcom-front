import React from "react";
import { Redirect } from 'react-router';
import {notification} from "antd";

class AuthRedirect extends React.Component {
    componentDidMount(): void {
        if (!window.App.isAuthorized()) {
            notification['error']({
                message: 'You need to log in to view this page'
            });
        }
    }

    render() {
        return !window.App.isAuthorized() ? <Redirect to={"/login"}/> : null;
    }
}

export default AuthRedirect;