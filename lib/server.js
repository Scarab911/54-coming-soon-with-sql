const http = require('http');
const { StringDecoder } = require('string_decoder');
const _data = require('./data');
const helpers = require('./helpers');

const config = require('../config');

const homePageHandler = require('./handlers/pages/home-page');
const notFoundPageHandler = require('./handlers/pages/404-page');

const server = {}

server.db = null;

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encrypted ? 's' : ''}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const parsedPathName = parsedURL.pathname;
    const queryStringObject = parsedURL.searchParams;
    const httpMethod = req.method.toLowerCase();
    const headers = req.headers;
    let trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');

    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    })

    req.on('end', async () => {
        buffer += decoder.end();

        const textFileExtensions = ['css', 'js', 'svg'];
        const binaryFileExtensions = ['woff2', 'woff', 'ttf', 'eot', 'otf', 'png', 'jpg', 'ico'];
        const urlParts = trimmedPath.split('.');
        const fileExtension = urlParts[urlParts.length - 1];
        const isTextFile = textFileExtensions.includes(fileExtension);
        const isBinaryFile = binaryFileExtensions.includes(fileExtension);

        const MIMES = {
            css: 'text/css',
            js: 'text/javascript',
            svg: 'image/svg+xml',
            woff2: 'font/woff2',
            woff: 'font/woff',
            ttf: 'font/ttf',
            eot: 'application/vnd.ms-fontobject',
            otf: 'font/otf',
            png: 'image/png',
            jpg: 'image/jpeg',
            ico: 'image/x-icon',
        }

        const data = {
            db: server.db,
            baseURL,
            trimmedPath,
            httpMethod,
            headers,
            queryStringObject,
            payload: helpers.parseJsonToObject(buffer),
        }

        if (isTextFile) {
            const fileContent = await _data.readStaticTextFile(trimmedPath);
            if (fileContent === '') {
                res.writeHead(404, {
                    'Content-Type': MIMES[fileExtension],
                })
            } else {
                res.writeHead(200, {
                    'Content-Type': MIMES[fileExtension],
                    // 'Cache-Control': 'max-age=3000000',
                })
            }
            return res.end(fileContent);

        } else if (isBinaryFile) {
            let fileContent = await _data.readStaticBinaryFile(trimmedPath);
            if (fileContent === '') {
                res.writeHead(404, {
                    'Content-Type': MIMES[fileExtension],
                })
            } else {
                res.writeHead(200, {
                    'Content-Type': MIMES[fileExtension],
                    // 'Cache-Control': 'max-age=3000000',
                })
            }
            return res.end(fileContent);

        } else if (trimmedPath.indexOf('api/') === 0) {
            // API
            trimmedPath = trimmedPath.slice(4);

            let handler = server.api[trimmedPath][trimmedPath];

            handler(data, (statusCode, payload = '', headers = {}) => {
                statusCode = typeof statusCode === 'number' ? statusCode : 200;
                payload = typeof payload === 'string' ? payload : JSON.stringify(payload);

                res.writeHead(statusCode, {
                    'Content-Type': 'application/json',
                    ...headers,
                })
                return res.end(payload);
            });

        } else {
            // PAGES
            let handler = server.routes[trimmedPath];
            handler = typeof handler === 'function' ? handler : server.routes['404'];

            let { HTML, headers } = await handler(data);
            if (typeof headers !== 'object') {
                headers = {};
            }
            if (HTML === '') {
                res.writeHead(404, {
                    'Content-Type': 'text/html',
                    ...headers,
                })
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                    ...headers,
                })
            }
            return res.end(HTML);
        }
    })
});

server.routes = {
    '': homePageHandler,
    '404': notFoundPageHandler,
}

server.api = {
}

server.init = (db) => {
    server.db = db;

    server.httpServer.listen(config.httpPort, () => {
        console.log(`Tavo serveris yra pasiekiamas http://localhost:${config.httpPort}`);
    })
}

module.exports = server;