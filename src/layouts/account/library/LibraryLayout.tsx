import React from 'react';
import FullPageWithSideBar from "../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import {Row} from "antd";
import MyLibraryItems from "../../../components/entity/my_library/many/MyLibraryItems";

interface IProps {
}

interface IState {
}

class LibraryLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {}
    }
    render() {
        return <FullPageWithSideBar sidebarType={"home"}>
            <div>
                <h3 className={"ant-typography"}>My library</h3>

                <Row className="margin-md-vertical"/>

                <MyLibraryItems/>
            </div>
        </FullPageWithSideBar>;
    }
}

export default LibraryLayout;