"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const widget_controller_1 = require("../controllers/widget.controller");
exports.default = (api) => {
    const controller = new widget_controller_1.WidgetController();
    const url = controller.resourceUrl;
    api.get({ path: url, version: ['1.0.0'] }, (req, res, next) => controller.list(req, res, next));
    api.post({ path: url, version: ['1.0.0'] }, (req, res, next) => controller.create(req, res, next));
    api.get({ path: `${url}/:id`, version: ['1.0.0'] }, (req, res, next) => controller.show(req, res, next));
    api.put({ path: `${url}/:id`, version: ['1.0.0'] }, (req, res, next) => controller.update(req, res, next));
    api.del({ path: `${url}/:id`, version: ['1.0.0'] }, (req, res, next) => controller.remove(req, res, next));
    api.get({ path: `/test`, version: ['1.0.0'] }, (req, res, next) => controller.addPhone(req, res, next));
    api.get({ path: `/getnews`, version: ['1.0.0'] }, (req, res, next) => controller.getNews(req, res, next));
};
//# sourceMappingURL=widget.route.js.map