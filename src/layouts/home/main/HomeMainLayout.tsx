import React from 'react';
import FullPageWithSideBar from "../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";

interface IProps {
}

interface IState {
}

class HomeMainLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {}
    }

    render() {
        return <FullPageWithSideBar sidebarType={"home"}>
            <div>
                Home layout
            </div>
        </FullPageWithSideBar>;
    }
}

export default HomeMainLayout;