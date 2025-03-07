const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://social-dierdre-mujtaba-technologies-30327e56.koyeb.app/',
      changeOrigin: true,
    })
  );
};