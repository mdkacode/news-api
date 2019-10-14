"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const env = process.env.NODE_ENV || 'development';
const config = {
    name: 'API Server',
    env: env,
    debug: process.env.DEBUG || true,
    root: path.join(__dirname, '/'),
    port: 8888,
    db: 'mongodb://localhost:27017/dev',
    version: '1.0.0',
};
exports.config = config;
if (env === 'test') {
    config.db = 'mongodb://localhost:27017/test';
}
if (env === 'production') {
    config.port = 8822;
    config.db = 'mongodb://localhost:27017/prod';
    config.debug = false;
}
//# sourceMappingURL=config.js.map