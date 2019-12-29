import React from "react";

interface IProps {
}

interface IState {
}

class AuthCheck extends React.Component<IProps, IState> {
    isAuthorized() {
        return window.App.isAuthorized();
    }

    render() {
        return <div>
            {this.isAuthorized() ? this.props.children : null}
        </div>;
    }
}

export default AuthCheck;
