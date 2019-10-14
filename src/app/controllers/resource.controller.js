"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
class ResourceController {
    constructor() {
    }
    list(req, res, next) {
        let filter = this.getFilter(req);
        console.log(filter);
        let sort = this.getSort(req);
        let fields = this.getSelectFields(req);
        return this.model
            .count(filter)
            .then((total) => {
            const threshold = (total < this.maxRecords) ? total : this.maxRecords;
            let page = parseInt(req.query.page, 10);
            let limit = parseInt(req.query.limit, 10);
            limit = !isNaN(limit) && limit < threshold ? limit : this.maxRecords;
            const pages = Math.floor(total / limit) + ((total % limit === 0) ? 0 : 1);
            page = !isNaN(page) && page <= pages ? page : 1;
            const skip = (page <= pages) ? (page - 1) * limit : 0;
            let queryParams = req.getQuery();
            queryParams = queryParams.replace(/&page(\=[^&]*)?(?=&|$)|^page(\=[^&]*)?(&|$)/, '');
            const url = `${this.resourceUrl}?${queryParams}`;
            return this.model.find(filter)
                .select(fields)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .exec()
                .then((records) => {
                const data = {
                    totalItems: total,
                    totalPages: pages,
                    page: (total === 0) ? total : page,
                    limit: limit,
                    links: {
                        self: (total === 0) ? '' : `${url}&page=${page}`,
                        next: (total === 0 || page === pages) ? '' : `${url}&page=${page + 1}`,
                        prev: (total === 0 || page === 1) ? '' : `${url}&page=${page - 1}`,
                        first: (total === 0) ? '' : `${url}&page=1`,
                        last: (total === 0) ? '' : `${url}&page=${pages}`
                    },
                    items: records
                };
                return Promise.resolve(data);
            });
        })
            .then((data) => {
            res.json(200, data);
            return next();
        })
            .catch((err) => next(err));
    }
    show(req, res, next) {
        return this.model
            .findById(req.params.id)
            .exec()
            .then((resource) => {
            let link = `<${(req.isSecure()) ? 'https' : 'http'}://${req.headers.host}${req.url}>; rel="self"`;
            res.setHeader('Link', link);
            res.json(200, resource);
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
    sendData(req, res, next) {
        res.json(200, 'I am Good');
    }
    create(req, res, next) {
        return this.model
            .create(req.params)
            .then((resource) => {
            let link = `<${(req.isSecure()) ? 'https' : 'http'}://${req.headers.host}${req.url}>; rel="self"`;
            res.setHeader('Link', link);
            res.json(201, resource);
            return next();
        })
            .catch((err) => next(new restify.BadRequestError({
            body: {
                code: 400,
                type: 'BadRequestError',
                message: 'Could not create resource',
                detail: err
            }
        })));
    }
    update(req, res, next) {
        return this.model
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((resource) => {
            let link = `<${(req.isSecure()) ? 'https' : 'http'}://${req.headers.host}${req.url}>; rel="self"`;
            res.setHeader('Link', link);
            res.json(200, resource);
            return next();
        })
            .catch((err) => next(new restify.BadRequestError({
            body: {
                code: 400,
                type: 'BadRequestError',
                message: 'Could not create resource',
                detail: err
            }
        })));
    }
    remove(req, res, next) {
        return this.model
            .findByIdAndRemove(req.params.id)
            .exec()
            .then(() => {
            res.json(204, 'Resource removed');
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
    getFilter(req) {
        let filter = {};
        for (let field of this.filterable) {
            if (typeof req.query[field] !== 'undefined') {
                filter[field] = req.query[field];
            }
        }
        if (typeof req.query['filter'] !== 'undefined') {
            try {
                let filters = JSON.parse(req.query['filter']);
                for (let filterVal of filters) {
                    filter = Object.assign(filter, filterVal);
                }
            }
            catch (e) {
            }
        }
        return filter;
    }
    getSort(req) {
        let sort = '';
        if (typeof req.query['sort'] !== 'undefined') {
            let sortFields = req.query['sort'].split(',');
            for (let sortField of sortFields) {
                if (this.sortable.indexOf(sortField.replace(/-/g, '')) !== -1) {
                    sort += `${sortField} `;
                }
            }
        }
        return sort;
    }
    getSelectFields(req) {
        let fields;
        if (typeof req.query['fields'] !== 'undefined') {
            fields = req.query['fields'].replace(/,/g, ' ');
        }
        return fields;
    }
}
exports.ResourceController = ResourceController;
//# sourceMappingURL=resource.controller.js.map