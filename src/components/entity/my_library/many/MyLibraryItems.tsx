import React from "react";
import {handleApiError} from "../../../../classes/notification/errorHandler/errorHandler";
import {LibraryItem} from "../../../../client/bindings";
import {Col, Icon, Row} from "antd";
import ItemCard from "../single/card/ItemCard";

interface IProps {
}

interface IState {
    isLoaded: boolean,
    items: LibraryItem[]
}

class MyLibraryItems extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoaded: false,
            items: []
        }
    }

    componentDidMount(): void {
        this.getItems();
    }

    getItems() {
        window.App.apiClient.getMyLibraryProjects(window.App.apiToken)
            .then((result) =>
                this.processGetItems(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processGetItems(response: any) {
        let json = JSON.parse(response.bodyAsText);

        this.setState({
            isLoaded: true,
            items: json.data.library_projects
        });
    }

    render() {
        if (!this.state.isLoaded) {
            return <Icon type="loading" style={{fontSize: "2em"}}/>;
        }
        return <div>
            <Row>
            {this.state.items.length === 0 ? <p>Your library is empty</p> : null}
            {this.state.items.map((item: LibraryItem, i: number) => {
                return <Col sm={12} xs={24} key={i}>
                    <ItemCard item={item}/>
                </Col>;
            })}
            </Row>
        </div>;
    }
}

export default MyLibraryItems;