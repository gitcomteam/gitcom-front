interface IAppConfig {
    api_url: string,
    sentry: {
        config_url: string
    },
    auth: {
        external: {
            google: {
                client_id: string
            }
        }
    }
}

export default IAppConfig;