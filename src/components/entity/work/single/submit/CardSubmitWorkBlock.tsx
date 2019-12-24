import React from 'react';
import {Select, Button, Icon, Modal, Input, Row, notification} from "antd";
import {CardModel, ProjectModel, ProjectWorkType} from "../../../../../client/bindings";
import {handleApiError} from "../../../../../classes/notification/errorHandler/errorHandler";
import {Link} from "react-router-dom";
import {
    GetProjectOKResponse, GetProjectResponse,
    GetProjectWorkTypesResponse
} from "../../../../../client/models";

const { Option } = Select;
const { TextArea } = Input;

interface IProps {
    card: CardModel
}

interface IState {
    isLoaded: boolean,
    project: ProjectModel|null,
    workTypes: ProjectWorkType[]|null,
    showModal: boolean,
    modalWasOpened: boolean,
    workSubmitted: boolean,
    proofOfWork: string,
    selectedWorkTypeGuid: string|null
}

class CardSubmitWorkBlock extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            project: null,
            showModal: false,
            modalWasOpened: false,
            workTypes: null,
            workSubmitted: false,
            selectedWorkTypeGuid: null,
            proofOfWork: ""
        };
    }

    submitWorkOnClick(): void {
        if (!this.state.modalWasOpened) {
            this.getProject();
        }
        this.setState({
            showModal: !this.state.showModal,
            modalWasOpened: true
        });
    }

    getProject(): void {
        window.App.apiClient.getCardProject(this.props.card.guid!)
            .then((result) =>
                this.processGetProjectResponse(result))
            .catch((error) => handleApiError(error.response));
    }

    processGetProjectResponse(response: GetProjectResponse): void {
        let json : GetProjectOKResponse = JSON.parse(response._response.bodyAsText);

        this.setState({
            project: json.data!.project!
        });

        this.getProjectWorkTypes();
    }

    getProjectWorkTypes(): void {
        window.App.apiClient.getProjectWorkTypes(this.state.project!.guid!)
            .then((result) =>
                this.processGetProjectWorkTypes(result))
            .catch((error) => handleApiError(error.response));
    }

    processGetProjectWorkTypes(response: GetProjectWorkTypesResponse): void {
        let json : any = JSON.parse(response._response.bodyAsText);

        if (!json.data!.work_types) {
            return;
        }
        this.setState({
            isLoaded: true,
            workTypes: json.data!.work_types
        });
    }

    onSelectWorkType(val: string) {
        this.setState({
            selectedWorkTypeGuid: val
        });
    }

    onProofOfWorkChange(e: any) {
        this.setState({
            proofOfWork: e.target.value
        });
    }

    submitWork(): void {
        if (this.state.workSubmitted) {
            notification['warning']({
                message: 'Work is already submitted',
                description: "Try again if you're sure that want to submit it"
            });
            this.setState({
                workSubmitted: false,
            });
            return;
        }
        this.setState({
            workSubmitted: true,
        });
        window.App.apiClient.postSubmitCardWork(
            window.App.apiToken, this.props.card.guid!, this.state.selectedWorkTypeGuid!, this.state.proofOfWork
        )
            .then((result) =>
                this.processSubmitWork(result))
            .catch((error) => handleApiError(error.response));
    }

    processSubmitWork(response: any) {
        notification['success']({
            message: 'Your work is submitted',
            description: "After it's approved by project team member and task is done, you'll receive a share of it's budget"
        });
        this.setState({
            workSubmitted: true,
            showModal: false,
        });
    }

    render() {
        if (!window.App.isAuthorized()) {
            return <div className={"text-center"}>
                <p>You need to log in to submit your work</p>
                <Link to={"/login"}>
                    <Button type={"primary"}>Log in</Button>
                </Link>
            </div>;
        }

        let modalContent = this.state.isLoaded ?
        <div>
            <b className={"ant-typography"}>Select type of work</b>
            <Select
                placeholder="Development, testing etc."
                style={{width: "100%"}}
                onChange={this.onSelectWorkType.bind(this)}
            >
                {this.state.workTypes!.map((workType: ProjectWorkType, i: number) => {
                    return <Option key={i} value={workType.guid}>{workType.title}</Option>;
                })}
            </Select>

            <Row className="padding-sm"/>

            <b className={"ant-typography"}>Proof of work</b>
            <TextArea
                rows={3}
                onChange={this.onProofOfWorkChange.bind(this)}
                placeholder={"Links, testing or configuration results, etc."}
            />

            <Row className="padding-md"/>

            <Row className={"text-center"}>
                <Button
                    type={"primary"}
                    onClick={this.submitWork.bind(this)}
                >Submit</Button>
            </Row>
        </div> :
        <div>
            <Icon type={"loading"}/>
        </div>;

        return (
            <div className="text-center">
                <Modal
                    title={<b className="text-center">Submit your work</b>}
                    visible={this.state.showModal}
                    width={window.innerWidth < 1000 ? "90%" : "40%"}
                    onCancel={() => {
                        this.setState({showModal: false})
                    }}
                    footer={null}
                >
                    <div className="padding-sm">
                        {modalContent}
                    </div>
                </Modal>

                <p>You've done something related to this task?</p>
                <Button
                    onClick={this.submitWorkOnClick.bind(this)}
                    type={"primary"}
                >Submit your work</Button>
            </div>
        );
    }
}

export default CardSubmitWorkBlock;
