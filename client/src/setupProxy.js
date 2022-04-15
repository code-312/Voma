require('dotenv').config
const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Cookies won't set across ports locally. This may be necessary for production as well if the API is served
 * from a subdomain but I'm not sure.
 * 
 * I'm gonna leave these here until we figure it out ...
 * https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
 * https://stackoverflow.com/questions/68886973/express-session-for-cross-domain-application-not-sending-cookies
 */

let target = process.env.REACT_APP_API_HOST;
if (process.env.NODE_ENV == 'development.local' && !target) { // Don't break locals missing the .env variable.
    target = 'http://localhost:5000';
}

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target,
            changeOrigin: true,
        })
    )
}
