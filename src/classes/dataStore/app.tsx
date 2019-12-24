import {SupportHubApi} from "../../client/supportHubApi";
import {UserModel} from "../../client/bindings";
import {handleApiError} from "../notification/errorHandler/errorHandler";

class App {
    apiClient: SupportHubApi;

    apiToken: string = "";

    authorizedUser: UserModel|null = null;

    constructor(props: any) {
        this.apiClient = new SupportHubApi({
            baseUri: window.AppConfig.api_url
        });

        let token = localStorage.getItem("api_token");
        if (token) {
            this.apiToken = token;
        }

        if (!this.authorizedUser && this.apiToken) {
            this.updateAuthorizedUser().then(() => {});
        }
    }

    async updateAuthorizedUser() {
        this.apiClient.getMe(this.apiToken)
            .then((result) =>
                this.processUser(result._response))
            .catch((error) => handleApiError(error.response));
    }

    processUser(response: any) {
        let json = JSON.parse(response.bodyAsText);

        if (!json.data.me) {
            return;
        }

        this.authorizedUser = json.data.me;
    }

    isAuthorized() : boolean {
        return this.apiToken !== "";
    }

    setApiToken(token: string) {
        this.apiToken = token;
        this.updateAuthorizedUser().then(() => {});
        localStorage.setItem("api_token", token);
    }

    logout() {
        localStorage.clear();
        this.apiToken = "";
        this.authorizedUser = null;
    }
}

export default App;