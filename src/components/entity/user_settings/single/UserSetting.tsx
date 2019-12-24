import React, {SyntheticEvent} from "react";
import {Button, Col, Icon, Input, notification, Row, Select} from "antd";
import {handleApiError} from "../../../../classes/notification/errorHandler/errorHandler";

const { Option } = Select;

interface IProps {
    settingName: string,
    settingKey: string,
    allowedValues: string[],
    type: string,
    defaultValue: string
}

interface IState {
    isLoaded: boolean,
    settingValue: string|null,
    newValue: string,
    requestDelayMultiplier: number
}

class UserSetting extends React.Component<IProps, IState> {
    public static defaultProps = {
        allowedValues: null
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            settingValue: "",
            newValue: "",

            requestDelayMultiplier: 1
        }
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.getValue();
        }, Math.floor(Math.random() * 1500));
    }

    getValue() {
        window.App.apiClient.getMySetting(window.App.apiToken, this.props.settingKey)
            .then((result) =>
                this.processGetSetting(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetSetting(response: any) {
        let json = JSON.parse(response.bodyAsText);

        this.setState({
            isLoaded: true,
            settingValue: json.data.setting.value
        });
    }

    updatedInput(e: SyntheticEvent) {
        const target: any = e.target;

        if (parseFloat(target.value) <= 0) {
            return;
        }

        let newValue = target.value;

        if (this.props.type === 'float') {
            if (!parseFloat(newValue)) {
                return;
            }
        }

        this.setState({
            newValue: newValue
        });
    }

    setValue(newValue: string) {
        window.App.apiClient.setMySetting(window.App.apiToken, this.props.settingKey, newValue)
            .then((result) =>
                this.processSetSetting(result._response))
            .catch((error) => handleApiError(error.response));

        setTimeout(() => {
            this.getValue();
        }, 750 * this.state.requestDelayMultiplier);
        this.increaseRequestDelay();
    }

    increaseRequestDelay() {
        this.setState({requestDelayMultiplier: this.state.requestDelayMultiplier + 0.1})
    }

    processSetSetting(response: any) {
        let json = JSON.parse(response.bodyAsText);

        notification['success']({
            message: 'Settings were updated',
            description: ''
        });

        this.setState({
            isLoaded: true,
            settingValue: json.data.setting.value
        });
    }

    setToNewValue() {
        this.setValue(this.state.newValue.toString());
    }

    render() {
        if (!this.state.isLoaded) {
            return <Icon type="loading" style={{fontSize: "2em"}}/>;
        }

        let content;

        if (this.props.type === "select") {
            content = <Select
                placeholder={this.props.allowedValues[0]}
                style={{width: "100%"}}
                defaultValue={this.state.settingValue!}
                onChange={this.setValue.bind(this)}
            >
                {this.props.allowedValues.map((allowedValue: string) => {
                    return <Option key={allowedValue}>{allowedValue}</Option>;
                })}
            </Select>;
        }

        if (this.props.type === "float") {
            content = <div>
                <Input placeholder={
                    this.state.settingValue || this.props.defaultValue
                } onChange={this.updatedInput.bind(this)}/>
                <Button
                    className="margin-sm"
                    type={"primary"}
                    onClick={this.setToNewValue.bind(this)}
                >Update</Button>
            </div>;
        }

        return <div>
            <Row>
                <Col sm={12} xs={24}><p className="ant-typography">{this.props.settingName}</p></Col>
                <Col sm={12} xs={24}>{content}</Col>
            </Row>
        </div>;
    }
}

export default UserSetting;
