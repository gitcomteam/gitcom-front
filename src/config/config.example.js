const devConfig = {
    api_url: "http://localhost:8000",
    sentry: {
        config_url: "https://some-id@sentry.io/some-id"
    },
    auth: {
        external: {
            google: {
                client_id: "some-id.apps.googleusercontent.com"
            }
        }
    }
};

const prodConfig = {
    api_url: "https://api.gitcom.org",
    sentry: {
        config_url: "https://some-id@sentry.io/some-id"
    },
    auth: {
        external: {
            google: {
                client_id: "some-id.apps.googleusercontent.com"
            }
        }
    }
};

export default process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;