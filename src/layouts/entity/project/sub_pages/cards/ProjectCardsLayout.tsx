import React from "react";
import FullPageWithSideBar from "../../../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import {Card, Col, Icon, Row, Skeleton} from "antd";
import {CardModel, ProjectModel} from "../../../../../client/bindings";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";
import CardCard from "../../../../../components/entity/card/single/card/CardCard";
import {Link} from "react-router-dom";
import Pagination from "../../../../../components/custom/antd/pagination/Pagination";

const { Meta } = Card;

interface IProps {
    match: {
        params: {
            owner: string,
            alias: string
        }
    }
}

interface IState {
    isLoaded: boolean,
    project: ProjectModel|null,
    cards: CardModel[]|null,
    pagesCount: number,
    currentPage: number,
}

class ProjectCardsLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            project: null,
            cards: null,
            pagesCount: 1,
            currentPage: 1
        };
    }

    componentDidMount(): void {
        let queryPage : any = new URL(window.location.href).searchParams.get('page');
        if (queryPage) {
            queryPage = parseInt(queryPage) ? parseInt(queryPage) : null;
            this.setState({currentPage: queryPage});
        }
        this.getProjectInfo();
    }

    getProjectInfo(): void {
        window.App.apiClient.getProjectByAlias(this.props.match.params.owner, this.props.match.params.alias)
            .then((res) => {
                this.setState({
                    isLoaded: true,
                    project: res.data!.project!
                });

                this.getCards(this.state.currentPage);
            })
            .catch((error) => handleApiError(error.response));
    }

    getCards(page: number = 1): void {
        this.setState({cards: null});
        window.App.apiClient.getProjectCards(this.state.project!.guid!, {
            page
        }).then((res) => {
            let rawData: any = res.data!;
            this.setState({
                cards: res.data!.cards!,
                currentPage: rawData.meta.current_page,
                pagesCount: rawData.meta.pages_count
            });
        });
    }

    render() {
        if (!this.state.isLoaded) {
            return <FullPageWithSideBar sidebarType={"project"}>
                <h3 className={"ant-typography"}>Loading cards...</h3>
                <Icon type="loading" style={{fontSize: "2em"}}/>
            </FullPageWithSideBar>;
        }

        let project = this.state.project;

        let skeletons = [];

        if (this.state.cards === null) {
            for (let i = 0; i < 10; i++) {
                skeletons.push(
                    <Col className="padding-sm" sm={12} xs={24} key={`card_${i}`}>
                        <Skeleton loading={true} active>
                            <Meta title="" description=""/>
                        </Skeleton>
                    </Col>
                );
            }
        }

        let cards = this.state.cards;

        let pagesCount = this.state.pagesCount;

        return <FullPageWithSideBar sidebarType={"project_view"}>
            <h2 className={"ant-typography"}>{project!.name}</h2>
            <Row type={"flex"}>
                {cards ? this.state.cards!.map((card: CardModel, i: number) => {
                    return <Col className={"padding-sm"} sm={12} xs={24} key={`card_${i}`}>
                        <Link to={`${window.location.pathname}?card=${card.guid}`}>
                            <CardCard card={card}/>
                        </Link>
                    </Col>
                }) : skeletons}
            </Row>{pagesCount ? <Row>
                <Pagination
                    currentPage={this.state.currentPage}
                    pagesCount={this.state.pagesCount}
                    onChange={this.getCards}
                />
            </Row> : null}
        </FullPageWithSideBar>
    }
}

export default ProjectCardsLayout;
