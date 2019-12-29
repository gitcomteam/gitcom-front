import {notification} from "antd";

export function handleApiError(response: any): void {
    if (process.env.NODE_ENV === "development") {
        console.error('RAW error response:');
        console.error(response);
    }
    if (!response) {
        showUnknownError();
        return;
    }
    let json: any;
    try {
        if (response.status === 401) {
            notification['error']({
                message: 'Unauthorized, please log in again',
                description: ''
            });
            return;
        }
        if (response.status === 404) {
            notification['error']({
                message: 'Not found',
                description: ''
            });
            return;
        }
        json = JSON.parse(response.body);
        if (response.status === 403) {
            notification['error']({
                message: 'Not allowed',
                description: json.errors[0].message
            });
            return;
        }
        if (response.status === 422) {
            notification['error']({
                message: 'Submitted form is invalid, please try again',
                description: json.errors[0].message
            });
            return;
        }
    } catch (e) {
        showUnknownError(e);
        return;
    }
    json.errors.forEach(function (val: any) {
        notification['error']({
            message: 'Error',
            description: val.message
        });
    });
}

export function showUnknownError(err: any = null) {
    if (err) {
        console.error(err);
    }
    console.error('Unknown error, we\'re already working on it :)');
}