"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("./config");
const restify_1 = require("./restify");
exports.server = restify_1.server;
const logger_1 = require("./logger");
mongoose.Promise = global.Promise;
const options = { server: { socketOptions: { keepAlive: 1 } } };
const db = mongoose.connect(config_1.config.db, options).connection;
mongoose.set('debug', config_1.config.debug);
db.on('error', (err) => {
    throw new Error(`Unable to connect to database: ${err}`);
});
db.once('open', () => {
    logger_1.logger.info(`Connected to database: ${config_1.config.db}`);
    restify_1.server.listen(config_1.config.port, () => {
        logger_1.logger.info(`${config_1.config.name} is running at ${restify_1.server.url}`);
    });
});
//# sourceMappingURL=server.js.map