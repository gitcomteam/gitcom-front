import React from "react";
import FullPageWithSideBar from "../../../../../components/layout/simple/fullpagewithsidebar/FullPageWithSidebar";
import {Col, Divider, Icon, Row} from "antd";
import PricingBlock from "../../../../../components/entity/product/pricing_block/single/PricingBlock";
import {ProjectModel, ProjectProduct} from "../../../../../client/bindings";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";
import NewProductButton from "../../../../../components/entity/product/action/new/NewProductButton";
import DeleteProductButton from "../../../../../components/entity/product/action/delete/DeleteProductButton";

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

class EditProjectPricingLayout extends React.Component<IProps, IState> {
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
            .then((res) => {
                let json = JSON.parse(res._response.bodyAsText);

                this.setState({
                    isLoaded: true,
                    project: json.data.project
                });

                this.getProducts();
            })
            .catch((error) => handleApiError(error.response));
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
        const infoBlock = <Row type={"flex"} justify={"center"}>
            <Icon type={"info-circle"} className={"margin-sm-sides"} style={{fontSize: "1.5em"}}/>
            <p className={"ant-typography"}>
                There are multiple ways how you can sell your open source product, a few popular business models are: <br/>
            </p>
            <p className={"ant-typography text-left"}>
                1. Open core model (when you have open source product and additional features built on top of it which
                you're selling) <br/>
                <b>example:</b> Community and Professional edition - it can be single purchase or subscription <br/>
                2. Sell support (your product can be 100% open source and you can earn money by offering technical support)
                <br/><br/>
                There are much more ways to do that - you can do your own research.
            </p>
        </Row>;

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
            {infoBlock}
            <Row type={"flex"}>
                <Col sm={12} xs={24} className="padding-sm">
                    <PricingBlock
                        guid={""}
                        title={"Free forever"}
                        price={0}
                        description={""}
                        showActionButton={false}
                    />
                </Col>
            </Row>
            <Divider/>
            {this.state.products ? this.state.products.map((product, i) => {
                return <div key={`product_${i}`}>
                    <Row>
                        <Col sm={12} xs={24} className="padding-sm">
                            <PricingBlock
                                guid={product.guid!}
                                title={product.name!}
                                description={product.description!}
                                price={product.usd_price!}
                                url={product.url!}
                                subscription={product.duration_hours! > 0}
                                showActionButton={false}
                            />
                        </Col>
                        <Col sm={12} xs={24} className="padding-sm">
                            <b>Stats:</b><br/><br/>
                            <Row className="text-left">
                                <p>Product owners count: {product.users_count}</p>
                            </Row>
                            <br/>
                            <b>Possible actions:</b><br/>
                            <Row className="text-left">
                                {product.users_count! > 0 ? <p>
                                    You cannot delete product with active users
                                </p> : null}
                                <DeleteProductButton product={product}/>
                            </Row>
                        </Col>
                    </Row>
                    <Divider/>
                </div>;
            }) : null}
            <NewProductButton projectGuid={project.guid!}/>
        </FullPageWithSideBar>;
    }
}

export default EditProjectPricingLayout;
