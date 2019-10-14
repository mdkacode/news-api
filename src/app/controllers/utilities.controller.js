"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ping(req, res, next) {
    res.json(200, 'OK');
    return next();
}
exports.ping = ping;
function health(req, res, next) {
    res.json(200, 'OK');
    return next();
}
exports.health = health;
function information(req, res, next) {
    res.json(200, 'OK');
    return next();
}
exports.information = information;
function configuration(req, res, next) {
    res.json(200, 'OK');
    return next();
}
exports.configuration = configuration;
function environment(req, res, next) {
    res.json(200, 'OK');
    return next();
}
exports.environment = environment;
//# sourceMappingURL=utilities.controller.js.map