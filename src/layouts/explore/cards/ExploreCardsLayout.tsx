import React from "react";
import FullPageWithSideBar from "../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import CardsList from "../../../components/entity/card/many/list/CardsList";

class ExploreCardsLayout extends React.Component {
    render() {
        return <FullPageWithSideBar sidebarType={"explore"}>
            <h4 className={"ant-typography"}>Explore cards</h4>
            <CardsList dataSource={"allCards"}/>
        </FullPageWithSideBar>
    }
}

export default ExploreCardsLayout;