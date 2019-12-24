import React from "react";
import { Route, Switch } from 'react-router-dom';
import IndexLayout from "./layouts/index/IndexLayout";
import LoginLayout from "./layouts/auth/login/LoginLayout";
import HomeMainLayout from "./layouts/home/main/HomeMainLayout";
import AccountLayout from "./layouts/account/account/AccountLayout";
import BillingLayout from "./layouts/account/billing/BillingLayout";
import SettingsLayout from "./layouts/account/settings/SettingsLayout";
import HomeIntegrationsLayout from "./layouts/home/integrations/HomeIntegrationsLayout";
import LoginWithGitLabLayout from "./layouts/auth/external/gitlab/logInWith/LoginWithGitLabLayout";
import LoginWithGitHubLayout from "./layouts/auth/external/github/loginWith/LoginWithGitHubLayout";
import ExternalRepoLayout from "./layouts/repos/external/default/ExternalRepoLayout";
import ProjectImportLayout from "./layouts/import/project/ProjectImportLayout";
import ProjectPage from "./layouts/entity/project/view/ProjectPage";
import BoardPage from "./layouts/entity/board/page/BoardPage";
import SubscriptionLayout from "./layouts/account/subscription/SubscriptionLayout";
import LibraryLayout from "./layouts/account/library/LibraryLayout";
import EditProjectLayout from "./layouts/entity/project/edit/EditProjectLayout";
import ProjectPricingLayout from "./layouts/entity/project/pricing/ProjectPricingLayout";

class Routes extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={IndexLayout}/>
                    <Route path="/login" exact component={LoginLayout}/>
                    <Route path="/home" exact component={HomeMainLayout}/>
                    <Route path="/home/integrations" exact component={HomeIntegrationsLayout}/>

                    <Route path="/account" exact component={AccountLayout}/>
                    <Route path="/account/billing" exact component={BillingLayout}/>
                    <Route path="/account/settings" exact component={SettingsLayout}/>
                    <Route path="/account/subscription" exact component={SubscriptionLayout}/>
                    <Route path="/account/library" exact component={LibraryLayout}/>

                    <Route path="/external/:serviceType/repositories" exact component={ExternalRepoLayout}/>

                    {/* External auth routes */}

                    <Route path="/auth/external/github/login" exact component={LoginWithGitHubLayout}/>
                    <Route path="/auth/external/gitlab/login" exact component={LoginWithGitLabLayout}/>

                    {/* External import routes */}

                    <Route path="/user/repository/import" exact component={ProjectImportLayout}/>

                    {/* Project */}

                    <Route path="/:owner/:alias" exact component={ProjectPage}/>
                    <Route path="/:owner/:alias/edit" exact component={EditProjectLayout}/>

                    <Route path="/:owner/:alias/pricing" exact component={ProjectPricingLayout}/>

                    <Route path="/:owner/:alias/board/:boardGuid" exact component={BoardPage}/>
                </Switch>
            </div>
        );
    }
}

export default Routes;