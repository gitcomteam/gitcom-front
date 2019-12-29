import React, {SyntheticEvent} from "react";
import {Button, Col, Input, Modal, notification, Row, Switch} from "antd";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";

const { TextArea } = Input;

interface IProps {
    projectGuid: string
}

interface IState {
    showModal: boolean,
    isLoading: boolean,
    form: {
        name: string,
        description: string,
        amount: number,
        url: string,
        use_url: string,
        duration_hours: number
    }
}

class NewProductButton extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            showModal: false,
            isLoading: false,
            form: {
                name: 'Pro edition',
                description: 'product description',
                amount: 0,
                url: '',
                use_url: '',
                duration_hours: 0
            }
        }
    }

    updateForm(field: string, val: string) {
        let form: any = this.state.form;
        form[field] = val;
        this.setState({form});
    }

    updatedAmount(e: SyntheticEvent) {
        const target: any = e.target;

        const floatVal = parseFloat(target.value);

        if (floatVal <= 0) return;

        let form = this.state.form;
        form.amount = floatVal;
        this.setState({form});
    }

    createProduct() {
        let form = this.state.form;
        window.App.apiClient.postProjectProduct(
            window.App.apiToken!, this.props.projectGuid, form.name, form.description, form.amount, form.url, form.use_url, {
                durationHours: this.state.form.duration_hours
            }
        )
            .then(() => {
                notification['success']({
                    message: 'Product was created successfully!'
                });
                this.setState({showModal: false});
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })
            .catch((error) => {
                try {
                    notification['error']({
                        message: JSON.parse(error.response.body).errors[0].message
                    });
                } catch (e) {
                    handleApiError(error.response);
                }
            });
    }

    render() {
        return <div>
            <Modal
                title={<b className="text-center">
                    Create new product
                </b>}
                visible={this.state.showModal}
                width={window.innerWidth < 1000 ? "90%" : "40%"}
                onCancel={() => {
                    this.setState({showModal: false})
                }}
                footer={null}
            >
                <Row>
                    <Col md={8} xs={24}>
                        <b>Product name</b>
                    </Col>
                    <Col md={16} xs={24}>
                        <Input
                            onChange={(e) => {this.updateForm('name', e.target.value)}}
                            defaultValue={'Professional edition'}
                        />
                    </Col>
                </Row>
                <Row className={"margin-sm-top"}>
                    <Col md={8} xs={24}>
                        <b>Description</b>
                    </Col>
                    <Col md={16} xs={24}>
                        <TextArea
                            rows={2}
                            onChange={(e) => {this.updateForm('description', e.target.value)}}
                            defaultValue={'Includes additional features like ...'}
                        />
                    </Col>
                </Row>
                <Row className={"margin-sm-top"}>
                    <Col md={8} xs={24}>
                        <b>Info URL</b><br/>
                        <p>(Optional) Provide url where customer can find more details about this product</p>
                    </Col>
                    <Col md={16} xs={24}>
                        <Input
                            onChange={(e) => {this.updateForm('url', e.target.value)}}
                            placeholder={'https://my-product.com/product-info'}
                        />
                    </Col>
                </Row>
                <Row className={"margin-sm-top"}>
                    <Col md={8} xs={24}>
                        <b>Download / use URL</b><br/>
                        <p>Provide url where customer can use / download this product</p>
                    </Col>
                    <Col md={16} xs={24}>
                        <Input
                            onChange={(e) => {this.updateForm('info_url', e.target.value)}}
                            placeholder={'https://my-product.com/download?licence_key=12dk12di9k120d1k2d'}
                        />
                    </Col>
                </Row>
                <Row className={"margin-sm-top"}>
                    <Col md={8} xs={24}>
                        <b>Subscription:</b>
                        <p>User will have to pay this amount per month, otherwise it will be one time purchase</p>
                    </Col>
                    <Col md={16} xs={24}>
                        <Switch
                            onChange={(is_subscription) => {
                                let form = this.state.form;
                                form.duration_hours = is_subscription ? 720 : 0;
                                this.setState({
                                    form
                                });
                                console.log(this.state.form);
                            }}
                        />
                    </Col>
                </Row>
                <Row className={"margin-sm-top"}>
                    <Col md={8} xs={24}>
                        <b>US$ Price:</b>
                        <p>Note: users can use other currencies such as BitCoin or Ethereum to purchase this product</p>
                    </Col>
                    <Col md={16} xs={24}>
                        <Input
                            onChange={this.updatedAmount.bind(this)}
                            defaultValue={'0.5'}
                        />
                    </Col>
                </Row>

                <Row className={"margin-sm-top text-center"}>
                    <b>Note:</b> there are 5% withdrawal fee for all users & developers
                </Row>

                <Row className="margin-sm-top flex-center">
                    <Button
                        icon={"plus"}
                        type={"primary"}
                        onClick={this.createProduct.bind(this)}
                    >Create</Button>
                </Row>
            </Modal>
            <Row type={"flex"} justify={"center"}>
                <Button type={"default"} icon={"plus"} onClick={() => this.setState({showModal: true})}>Add</Button>
            </Row>
        </div>;
    }
}

export default NewProductButton;
