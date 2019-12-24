import {notification} from "antd";

export function handleApiError(response: any): void {
    // TODO: only in dev mode
    console.error('RAW error response:');
    console.error(response);
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
            window.App.logout();
            return;
        }
        if (response.status === 404) {
            notification['error']({
                message: 'Not found',
                description: ''
            });
            return;
        }
        json = JSON.parse(response);
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
        // TODO: only in dev mode
        console.error(err);
    }
    console.error('Unknown error, we\'re already working on it :)');
}