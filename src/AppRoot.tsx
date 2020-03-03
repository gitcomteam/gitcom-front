import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import './app.css';
import Routes from "./Routes";
import App from "./classes/dataStore/app";
import config from './config/config';
import IAppConfig from "./intarface/AppConfig";

declare global {
    interface Window {
        App: App;
        AppConfig: IAppConfig;
    }
}

window.AppConfig = config;

// @ts-ignore
window.App = new App();

async function loadScriptAsync(url: string) {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
}

loadScriptAsync("https://momentjs.com/downloads/moment.min.js").then(() => {});

setTimeout(() => {
    loadScriptAsync("/js/lazy_init.js").then(() => {});
}, 1000);

function AppRoot() {
    return (
        <div className="app">
            <Router>
                <Routes/>
            </Router>
        </div>
    );
}

export default AppRoot;
