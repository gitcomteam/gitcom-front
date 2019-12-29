import React from "react";
import {ProjectProduct} from "../../../../../client/bindings";
import {Button, notification, Row} from "antd";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";

interface IProps {
    product: ProjectProduct
}

interface IState {
    isLoading: boolean
}

class DeleteProductButton extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    sendDeleteRequest() {
        window.App.apiClient.deleteProjectProduct(window.App.apiToken, this.props.product.guid!)
            .then(() => {
                notification['warning']({
                    message: 'Product was deleted'
                });
                setTimeout(() => { window.location.reload(); }, 1500);
            })
            .catch((error) => handleApiError(error.response));
    }

    render() {
        return <div>
            <Row type={"flex"} justify={"center"}>
                <Button
                    type={"danger"}
                    icon={"delete"}
                    onClick={this.sendDeleteRequest.bind(this)}
                    disabled={this.props.product.users_count! > 0}
                >Delete</Button>
            </Row>
        </div>
    }
}

export default DeleteProductButton;
