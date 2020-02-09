import React from "react";
import FullPageWithSideBar from "../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import ProjectCardList from "../../../components/entity/project/many/cards_list/ProjectCardList";

class ExploreProjectsLayout extends React.Component {
    render() {
        return <FullPageWithSideBar sidebarType={"explore"}>
            <ProjectCardList
                label={"Newest projects"}
                type={"newest"}
                displayPagination={true}
            />
        </FullPageWithSideBar>
    }
}

export default ExploreProjectsLayout;
