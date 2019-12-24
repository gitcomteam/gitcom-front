import React from "react";
import {Button, Input, Modal, notification, Row} from "antd";
import {CardModel, ColumnModel} from "../../../../../client/bindings";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";

const { TextArea } = Input;

interface IProps {
    column: ColumnModel
}

interface IState {
    showModal: boolean,
    newCard: CardModel,

    requestSent: boolean
}

class CreateCard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            showModal: false,
            newCard: new CardModel(),

            requestSent: false
        }
    }

    openModal() {
        this.setState({
            showModal: true
        });
    }

    updateCard(field: string, value: any) {
        let updatedCard: any = this.state.newCard;
        updatedCard[field] = value;
        this.setState({
            newCard: updatedCard
        });
    }

    createCard() {
        window.App.apiClient.createCard(window.App.apiToken, this.props.column.guid!, this.state.newCard.name!, {
            description: this.state.newCard.description!
        })
            .then((result) =>
                this.processCardCreated(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processCardCreated(response: any) {
        notification['success']({
            message: 'Card was created!',
            description: ''
        });

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    render() {
        return <div>
            <Modal
                title={<b className="text-center">Create new card</b>}
                visible={this.state.showModal}
                width={window.innerWidth < 1000 ? "90%" : "30%"}
                onCancel={() => {
                    this.setState({showModal: false})
                }}
                footer={null}
            >
                <Row>
                    <b>Name:</b>
                    <Input onChange={(e) => {
                        this.updateCard("name", e.target.value);
                    }} placeholder="Add new amazing feature" />

                    <b className="margin-md-top">Description:</b>
                    <TextArea
                        rows={3}
                        onChange={(e) => {
                            this.updateCard("description", e.target.value);
                        }}
                        placeholder={"Specify what kind of things need to be done"}
                    />
                </Row>
                <Row className="text-center margin-md-top">
                    <Button
                        type={"primary"}
                        icon={"plus"}
                        onClick={this.createCard.bind(this)}
                    >Create</Button>
                </Row>
            </Modal>
            <Button
                type={"primary"}
                icon={"plus"}
                onClick={this.openModal.bind(this)}
            >Add</Button>
        </div>
    }
}

export default CreateCard;