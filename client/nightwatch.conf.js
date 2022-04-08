module.exports = {
    src_folders: [
        'tests/forms',
    ],

    webdriver: {
        start_process: true,
        port: 4444,
        server_path: require('chromedriver').path,
        cli_args: [

        ],
    },

    test_settings: {
        default: {
            launch_url: 'http://localhost:3000',
            desiredCapabilities: {
                browserName: 'chrome',
            }
        }
    }
}