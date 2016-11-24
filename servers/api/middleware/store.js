/**
 * MIT License
 *
 * Copyright (c) 2016 InSoft Engineering / github.com/insoftpub
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { statusCodes } from '../../constants';
import { auth } from '../config';
import Logger from '../Logger';
import schemaIO from 'schema-client';
import {
    reduce,
    includes,
    isEmpty,
    map,
    isUndefined,
    trim
} from 'lodash';

const
    schemaClient = new schemaIO.Client(auth.schemaIO.clientId, auth.schemaIO.clientSecret),
    logger = new Logger(),
    API_PATH = '/api';

function isGetMethod({ method }) {
    return method === 'GET';
}

function getParams(req) {
    const
        params = isGetMethod(req) ? req.query : req.body,
        constParams = req.constParams || {};

    if (isUndefined(req.interface)) {
        return {
            ...params,
            ...constParams
        };
    }

    return reduce(params, (memo, param, key) => {
        if (includes(req.interface, key)) {
            memo[key] = param;
        }

        return memo;
    }, constParams);
}

function createFilterParams({ query }) {
    let result = [];

    if (query.category_id) {
        result.push({ 'category_index.id': query.category_id });

        if (!isEmpty(query.filter)) {
            query.filter.manufacturers_ids && result.push({
                $or: map(query.filter.manufacturers_ids, id => ({ 'category_index.id': id }))
            });
            query.filter.categories_ids && result.push({
                $or: map(query.filter.categories_ids, id => ({ 'category_index.id': id }))
            });
        }
    }

    return isEmpty(result) ? {} : { $and: result };
}

function callback(req, res) {
    const
        startTime = new Date().getTime(),
        params = getParams(req);

    schemaClient[req.method.toLowerCase()](req.modelPath, params)
        .then(data => {
            const endTime = new Date().getTime();

            res
                .set('Content-Type', 'application/json')
                .status(statusCodes.OK)
                .send(data.toJSON());

            logger.add({
                req,
                params,
                statusCode: statusCodes.OK,
                time: endTime - startTime
            });
        })
        .catch(error => {
            const endTime = new Date().getTime();

            if (typeof error === 'object') {
                res.status(statusCodes.BAD_REQUEST).send(JSON.stringify(error));
            } else {
                res.status(statusCodes.BAD_REQUEST).send({
                    errors: {
                        url: error
                    }
                });
            }

            logger.add({
                req,
                params,
                statusCode: statusCodes.BAD_REQUEST,
                time: endTime - startTime
            });
        });
}

function store(server) {
    // Categories
    server
        .route(API_PATH + '/categories')
        .all((req, res, next) => {
            req.modelPath = '/categories';
            req.interface = [
                'active',
                'navigation',
                'type',
                'slug'
            ];
            req.constParams = {
                fields: [
                    'active',
                    'id',
                    'slug',
                    'parent_id',
                    'name',
                    'type',
                    'navigation',
                    'sizes'
                ],
                limit: -1,
                active: true
            };

            next();
        })
        .get(callback);

    // Products
    server
        .route(API_PATH + '/products')
        .all((req, res, next) => {
            req.modelPath = '/products';
            req.interface = [
                'limit',
                'page',
                'active'
            ];
            req.constParams = {
                fields: [
                    'categories',
                    'manufacturer_name',
                    'currency',
                    'description',
                    'id',
                    'images',
                    'name',
                    'options',
                    'price',
                    'runway',
                    'season',
                    'slug',
                    'sku',
                    'sizes'
                ],
                active: true,
                ...createFilterParams(req)
            };

            next();
        })
        .get(callback);

    // Filter
    server
        .route(API_PATH + '/filter')
        .all((req, res, next) => {
            req.modelPath = '/products';
            req.interface = [];
            req.constParams = {
                fields: [
                    'category_index'
                ],
                active: true,
                limit: -1,
                ...createFilterParams(req)
            };

            next();
        })
        .get(callback);

    // Product
    server
        .route(API_PATH + '/product')
        .all((req, res, next) => {
            req.modelPath = '/products';
            req.interface = [
                'slug'
            ];
            req.constParams = {
                fields: [
                    'variants',
                    'categories',
                    'manufacturer_name',
                    'currency',
                    'description',
                    'id',
                    'images',
                    'name',
                    'options',
                    'price',
                    'runway',
                    'season',
                    'slug',
                    'sku',
                    'sizes',
                    'recommended_products'
                ],
                active: true,
                expand: [
                    'variants',
                    'categories.parent',
                    'recommended_products.product.categories.parent'
                ]
            };

            next();
        })
        .get(callback);

    // User
    server
        .route(API_PATH + '/accounts*')
        .all((req, res, next) => {
            req.modelPath = req.path.replace('/api', '');
            req.interface = [
                'email',
                'facebook_id'
            ];

            next();
        })
        .get((req, res, next) => {
            const pathParams = trim(req.modelPath, '/').split('/');

            if (pathParams[1] || req.query && req.query.password_reset_code) {
                callback(req, res, next);
            } else {
                res.send('Cannot GET ' + req.path);
            }
        })
        .post(callback)
        .put(callback);

    // Cart
    server
        .route(API_PATH + '/carts*')
        .all((req, res, next) => {
            req.modelPath = req.path.replace('/api', '');

            next();
        })
        .get((req, res, next) => {
            const pathParams = trim(req.modelPath, '/').split('/');

            req.constParams = {
                expand: [
                    'items.product',
                    'items.variant'
                ]
            };

            if (pathParams[1]) {
                callback(req, res, next);
            } else {
                res.send('Cannot GET ' + req.path);
            }
        })
        .post(callback)
        .delete(callback);

    // Order
    server
        .route(API_PATH + '/orders*')
        .all((req, res, next) => {
            req.interface = [
                'account_id',
                'cart_id',
                'num',
                'shipping'
            ];
            req.constParams = {
                closed: 'false'
            };
            req.modelPath = req.path.replace('/api', '');

            next();
        })
        .get((req, res, next) => {
            if (req.query && req.query.account_id) {
                callback(req, res, next);
            } else {
                res.send('Missing required parameter "account_id".');
            }
        })
        .post(callback);
}

export default store;
