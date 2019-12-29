import React from "react";
import {Button, Input, Modal, notification, Row} from "antd";
import {CardModel} from "../../../../../client/bindings";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";

const { TextArea } = Input;

interface IProps {
    card: CardModel
}

interface IState {
    updatedCard: CardModel
    showModal: boolean
}

class EditCard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            showModal: false,
            updatedCard: this.props.card
        }
    }

    updateCard(field: string, value: any) {
        let updatedCard: any = this.state.updatedCard;
        updatedCard[field] = value;
        this.setState({
            updatedCard
        });
    }

    updateCardRequest() {
        window.App.apiClient.editCard(window.App.apiToken, this.props.card.guid!, this.state.updatedCard)
            .then((result) =>
                this.processCardUpdated(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processCardUpdated(response: any) {
        notification['success']({
            message: 'Card updated!'
        });
        this.setState({showModal: false});
    }

    render() {
        return <div>
            <Modal
                title={<b className="text-center">Edit card</b>}
                visible={this.state.showModal}
                width={window.innerWidth < 1000 ? "90%" : "30%"}
                onCancel={() => {
                    this.setState({showModal: false})
                }}
                footer={null}
            >
                <Row>
                    <b>Name:</b>
                    <Input
                        onChange={(e) => {
                            this.updateCard("name", e.target.value);
                        }}
                        placeholder="Add new amazing feature"
                        defaultValue={this.props.card.name}
                    />

                    <b className="margin-md-top">Description:</b>
                    <TextArea
                        rows={3}
                        onChange={(e: any) => {
                            this.updateCard("description", e.target.value);
                        }}
                        placeholder={"Specify what kind of things need to be done"}
                        defaultValue={this.props.card.description}
                    />
                </Row>
                <Row className="text-center margin-md-top">
                    <Button
                        type={"primary"}
                        icon={"edit"}
                        onClick={this.updateCardRequest.bind(this)}
                    >Update</Button>
                </Row>
            </Modal>
            <Button
                type={"default"}
                icon={"edit"}
                onClick={() => { this.setState({showModal: true}); }}
            >Edit</Button>
        </div>;
    }
}

export default EditCard;
