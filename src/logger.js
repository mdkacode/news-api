"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require("bunyan");
const stream = require("stream");
const path = require("path");
const config_1 = require("./config");
const pathToLogs = path.join(config_1.config.root, '/logs');
const infoStream = new stream.Writable();
infoStream.writable = true;
infoStream.write = (info) => {
    console.log(JSON.parse(info).msg);
    return true;
};
let settings = {
    name: config_1.config.env,
    streams: [{ level: 'error', path: `${pathToLogs}/error.log` }]
};
if (config_1.config.env === 'development') {
    settings.streams.push({ level: 'info', stream: infoStream });
}
if (config_1.config.debug) {
    settings.streams.push({ level: 'trace', stream: infoStream });
    settings.streams.push({ level: 'debug', path: `${pathToLogs}/debug.log` });
}
const logger = bunyan.createLogger(settings);
exports.logger = logger;
//# sourceMappingURL=logger.js.map