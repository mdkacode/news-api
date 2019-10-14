import { ResourceController } from './resource.controller';
import { Widget } from '../models/widget.model';
import { PhoneWidget } from "../models/phoneRecord";
import * as restify from 'restify';
import axios from 'axios';
import notification from '../utils/notification';
class WidgetController extends ResourceController {

    /* Abstract implementation */
    protected model = Widget;
    protected phoneModal = PhoneWidget;
    public resourceUrl = '/api/widgets';

    // maximum number of records that can be returned
    protected maxRecords = 20;

    // fields that results can be filtered by
    public filterable = ['current', 'name', 'rank', 'deleted'];

    // fields that results can be sorted by
    public sortable = ['name', 'updatedAt', 'rank', 'deletedAt'];

    /**
     * Soft delete resource
     * 
     * @param {restify.Request} req 
     * @param {restify.Response} res 
     * @param {restify.Next} next 
     * @returns Promise
     * 
     * @memberof ResourceController
     */
    public remove(req: restify.Request, res: restify.Response, next: restify.Next) {
        const timestamp = new Date();
        return this.model
            .findByIdAndUpdate(req.params.id, {deleted: true, deletedAt: timestamp}, {new: false})
            .exec()
            .then((widget) => {
                let link: string = `<${(req.isSecure()) ? 'https' : 'http'}://${req.headers.host}${req.url}>; rel="self"`;
                res.setHeader('Link', link);
                
                // return the soft deleted resource
                res.json(200, widget);
                return next();
            })
            .catch((err: any) => next(
                new restify.NotFoundError({
                    body: {
                        code: (err.name === 'CastError') ? 404 : res.statusCode,
                        type: (err.name === 'CastError') ? 'NotFoundError' : err.name,
                        message: (err.name === 'CastError') ? 'Resource not found' : res.statusMessage,
                        detail: err
                    }
                })
            ));
    }

    public addPhone(req: restify.Request, res: restify.Response, next: restify.Next) {

        return this.phoneModal
        .create(req.params).then((resource) => {
            let link: string = `<${(req.isSecure()) ? 'https' : 'http'}://${req.headers.host}${req.url}>; rel="self"`;
            res.setHeader('Link', link);
            res.json(201, resource);
            return next();
        })
    }

    public getNews(req: restify.Request, res: restify.Response, next: restify.Next) {
        const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=deeb6c4c85de4735a1133a3fd69fe347';
        
        axios.get(url).then(response => {
            console.log(response.data.articles)
             res.json(response.data.articles)
             notification(response.data.articles[0].title,response.data.articles[0].description);
             return next();
          })
    }
}

export { WidgetController };
