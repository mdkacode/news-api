"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const restify = require("restify");
const path = require("path");
const config_1 = require("./config");
const logger_1 = require("./logger");
const pathToRoutes = path.join(config_1.config.root, '/app/routes');
const server = restify.createServer({
    name: config_1.config.name,
    version: config_1.config.version
});
exports.server = server;
server.pre(restify.pre.sanitizePath());
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    logger_1.logger.info(`${req.method} ${req.url}`);
    logger_1.logger.info(`Params: ${JSON.stringify(req.params)}`);
    return next();
});
fs.readdir(pathToRoutes, (err, files) => {
    if (err) {
        throw new Error(err);
    }
    else {
        files
            .filter((file) => path.extname(file) === '.js')
            .forEach((file) => {
            const route = require(path.join(pathToRoutes, file));
            route.default(server);
        });
    }
});
//# sourceMappingURL=restify.js.map