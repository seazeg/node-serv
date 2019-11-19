const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

http.createServer(function (req, res) {
    console.log(req.url);
    proxy.web(req, res, {
        target: 'http://127.0.0.1:5257'
    });
}).listen(3000);



