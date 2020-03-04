import React, { Suspense, lazy } from "react";
import { Route, Switch } from 'react-router-dom';
import { Icon } from 'antd';
import ExploreCardsLayout from "./layouts/explore/cards/ExploreCardsLayout";
const IndexLayout = lazy(() => import("./layouts/index/IndexLayout"));
const LoginWithGitLabLayout = lazy(() => import("./layouts/auth/external/gitlab/logInWith/LoginWithGitLabLayout"));
const LoginWithGitHubLayout = lazy(() => import("./layouts/auth/external/github/loginWith/LoginWithGitHubLayout"));
const ExternalRepoLayout = lazy(() => import("./layouts/repos/external/default/ExternalRepoLayout"));
const ProjectPage = lazy(() => import("./layouts/entity/project/view/ProjectPage"));
const BoardPage = lazy(() => import("./layouts/entity/board/page/BoardPage"));
const SubscriptionLayout = lazy(() => import("./layouts/account/subscription/SubscriptionLayout"));
const LibraryLayout = lazy(() => import("./layouts/account/library/LibraryLayout"));
const EditProjectLayout = lazy(() => import("./layouts/entity/project/edit/EditProjectLayout"));
const ProjectPricingLayout = lazy(() => import("./layouts/entity/project/pricing/view/ProjectPricingLayout"));
const RegisterLayout = lazy(() => import("./layouts/auth/register/RegisterLayout"));
const ConfirmEmailLayout = lazy(() => import("./layouts/auth/confirmEmail/ConfirmEmailLayout"));
const NotFoundLayout = lazy(() => import("./layouts/404/NotFoundLayout"));
const HelpLayout = lazy(() => import("./layouts/help/HelpLayout"));
const EditProjectPricingLayout = lazy(() => import("./layouts/entity/project/pricing/edit/EditProjectPricingLayout"));
const WithdrawalsLayout = lazy(() => import("./layouts/account/withdrawals/WithdrawalsLayout"));
const DeveloperQuickstartLayout = lazy(() => import("./layouts/quickstart/developer/DeveloperQuickstartLayout"));
const ProjectCardsLayout = lazy(() => import("./layouts/entity/project/sub_pages/cards/ProjectCardsLayout"));
const ExploreProjectsLayout = lazy(() => import("./layouts/explore/projects/ExploreProjectsLayout"));
const LoginLayout = lazy(() => import("./layouts/auth/login/LoginLayout"));
const HomeMainLayout = lazy(() => import("./layouts/home/main/HomeMainLayout"));
const AccountLayout = lazy(() => import("./layouts/account/account/AccountLayout"));
const BillingLayout = lazy(() => import("./layouts/account/billing/BillingLayout"));
const SettingsLayout = lazy(() => import("./layouts/account/settings/SettingsLayout"));
const HomeIntegrationsLayout = lazy(() => import("./layouts/home/integrations/HomeIntegrationsLayout"));

class Routes extends React.Component {
    render() {
        return (
            <Suspense
                fallback={
                    <Icon type="loading" style={{fontSize: "2em"}}/>
                }>
                <Switch>
                    <Route path="/" exact component={IndexLayout}/>
                    {/* Auth */}
                    <Route path="/login" exact component={LoginLayout}/>
                    <Route path="/register" exact component={RegisterLayout}/>
                    <Route path="/register/confirm-email" exact component={ConfirmEmailLayout}/>

                    <Route path="/help" exact component={HelpLayout}/>

                    {/* Home */}

                    <Route path="/home" exact component={HomeMainLayout}/>
                    <Route path="/home/integrations" exact component={HomeIntegrationsLayout}/>

                    <Route path="/account" exact component={AccountLayout}/>
                    <Route path="/account/billing" exact component={BillingLayout}/>
                    <Route path="/account/settings" exact component={SettingsLayout}/>
                    <Route path="/account/subscription" exact component={SubscriptionLayout}/>
                    <Route path="/account/withdrawals" exact component={WithdrawalsLayout}/>
                    <Route path="/account/library" exact component={LibraryLayout}/>

                    <Route path="/external/:serviceType/repositories" exact component={ExternalRepoLayout}/>

                    {/* Quickstart pages */}

                    <Route path="/quickstart/developer" exact component={DeveloperQuickstartLayout}/>

                    {/* External auth routes */}

                    <Route path="/auth/external/github/login" exact component={LoginWithGitHubLayout}/>
                    <Route path="/auth/external/gitlab/login" exact component={LoginWithGitLabLayout}/>

                    {/* Explore */}

                    <Route path="/explore/projects" exact component={ExploreProjectsLayout}/>
                    <Route path="/explore/cards" exact component={ExploreCardsLayout}/>

                    {/* Project */}

                    <Route path="/:owner/:alias" exact component={ProjectPage}/>
                    <Route path="/:owner/:alias/edit" exact component={EditProjectLayout}/>

                    <Route path="/:owner/:alias/pricing" exact component={ProjectPricingLayout}/>
                    <Route path="/:owner/:alias/pricing/edit" exact component={EditProjectPricingLayout}/>

                    <Route path="/:owner/:alias/board/:boardGuid" exact component={BoardPage}/>

                    <Route path="/:owner/:alias/cards" exact component={ProjectCardsLayout}/>

                    <Route component={NotFoundLayout}/>
                </Switch>
            </Suspense>
        );
    }
}

export default Routes;