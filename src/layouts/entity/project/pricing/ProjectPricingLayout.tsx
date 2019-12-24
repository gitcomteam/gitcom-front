import React from "react";
import FullPageWithSideBar from "../../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import {handleApiError} from "../../../../classes/notification/errorHandler/errorHandler";
import {ProjectModel, ProjectProduct} from "../../../../client/bindings";
import {Col, Icon, Row} from "antd";
import PricingBlock from "../../../../components/entity/product/pricing_block/single/PricingBlock";

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
    products: ProjectProduct[]|null
}

class ProjectPricingLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            project: null,
            products: null
        };
    }

    componentDidMount(): void {
        this.getProjectInfo();
    }

    getProjectInfo(): void {
        window.App.apiClient.getProjectByAlias(this.props.match.params.owner, this.props.match.params.alias)
            .then((result) =>
                this.processGetProjectInfo(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetProjectInfo(response: any) {
        let json = JSON.parse(response.bodyAsText);

        this.setState({
            isLoaded: true,
            project: json.data.project
        });

        this.getProducts();
    }

    getProducts() {
        window.App.apiClient.getProjectProducts(this.state.project!.guid!)
            .then((result) =>
                this.processGetProducts(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetProducts(response: any) {
        let json = JSON.parse(response.bodyAsText);
        this.setState({
            products: json.data.products
        });
    }

    render() {
        if (!this.state.isLoaded || !this.state.project) {
            return <FullPageWithSideBar sidebarType={"project"}>
                <h3 className={"ant-typography"}>Loading project info</h3>
                <Icon type="loading" style={{fontSize: "2em"}}/>
            </FullPageWithSideBar>;
        }

        let project: ProjectModel = this.state.project;

        return <FullPageWithSideBar sidebarType={"project_view"}>
            <h2 className={"ant-typography"}>{project.name}</h2>
            <p>{project.description}</p>
            <Row type={"flex"}>
                <Col sm={8} xs={24} className="padding-sm">
                    <PricingBlock
                        guid={""}
                        title={"Free forever"}
                        price={0}
                        description={""}
                        showActionButton={false}
                    />
                </Col>
                {this.state.products ? this.state.products.map((product, i) => {
                    return <Col key={i} sm={8} xs={24} className="padding-sm">
                        <PricingBlock
                            guid={product.guid!}
                            title={product.name!}
                            price={product.usd_price!}
                            subscription={product.duration_hours! > 0}
                            description={product.description!}
                        />
                    </Col>;
                }) : null}
            </Row>
        </FullPageWithSideBar>;
    }
}

export default ProjectPricingLayout;
