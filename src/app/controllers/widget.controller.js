"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_controller_1 = require("./resource.controller");
const widget_model_1 = require("../models/widget.model");
const phoneRecord_1 = require("../models/phoneRecord");
const restify = require("restify");
const axios_1 = require("axios");
const notification_1 = require("../utils/notification");
class WidgetController extends resource_controller_1.ResourceController {
    constructor() {
        super(...arguments);
        this.model = widget_model_1.Widget;
        this.phoneModal = phoneRecord_1.PhoneWidget;
        this.resourceUrl = '/api/widgets';
        this.maxRecords = 20;
        this.filterable = ['current', 'name', 'rank', 'deleted'];
        this.sortable = ['name', 'updatedAt', 'rank', 'deletedAt'];
    }
    remove(req, res, next) {
        const timestamp = new Date();
        return this.model
            .findByIdAndUpdate(req.params.id, { deleted: true, deletedAt: timestamp }, { new: false })
            .exec()
            .then((widget) => {
            let link = `<${(req.isSecure()) ? 'https' : 'http'}://${req.headers.host}${req.url}>; rel="self"`;
            res.setHeader('Link', link);
            res.json(200, widget);
            return next();
        })
            .catch((err) => next(new restify.NotFoundError({
            body: {
                code: (err.name === 'CastError') ? 404 : res.statusCode,
                type: (err.name === 'CastError') ? 'NotFoundError' : err.name,
                message: (err.name === 'CastError') ? 'Resource not found' : res.statusMessage,
                detail: err
            }
        })));
    }
    addPhone(req, res, next) {
        return this.phoneModal
            .create(req.params).then((resource) => {
            let link = `<${(req.isSecure()) ? 'https' : 'http'}://${req.headers.host}${req.url}>; rel="self"`;
            res.setHeader('Link', link);
            res.json(201, resource);
            return next();
        });
    }
    getNews(req, res, next) {
        const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=deeb6c4c85de4735a1133a3fd69fe347';
        axios_1.default.get(url).then(response => {
            console.log(response.data.articles);
            res.json(response.data.articles);
            notification_1.default(response.data.articles[0].title, response.data.articles[0].description);
            return next();
        });
    }
}
exports.WidgetController = WidgetController;
//# sourceMappingURL=widget.controller.js.map