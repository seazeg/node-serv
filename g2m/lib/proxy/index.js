'use strict';

const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

http.createServer(function (req, res) {

    if (req.url.includes('/api')) {
        proxy.web(req, res, {
            target: 'http://127.0.0.1:5257'
        });
    }

    proxy.on('error', function (err, req, res) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end('Something went wrong. And we are reporting a custom error message.');
    });

    proxy.on('proxyRes', function (proxyRes, req, res) {
        console.log(proxyRes.statusCode);
    });

    proxy.on('open', function (proxySocket) {
        proxySocket.on('data', hybiParseAndLogMessage);
    });

    proxy.on('close', function (res, socket, head) {
        console.log('Client disconnected');
    });
}).listen(3000);

console.log('proxy server was opened');