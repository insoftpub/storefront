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

import actionTypes from '../constants/actionTypes.js';
import service from '../services/api';
import { pagination } from '../config';

const
    path = '/products',
    defaultParams = {
        active: true
    };

export default {
    list(context, { ...params } = {}) {
        return service({
            path,
            params: {
                ...params,
                limit: pagination.PAGE_SIZE
            }
        })
            .then(data => context.dispatch(actionTypes.PRODUCTS_LOAD, {
                // The object used to detect if the new products should be concated or replaced
                category: params.category_id,
                ...data
            }));
    },

    getByCategoriesIds(context, { categoriesIds, slugs, ...params }) {
        return service({
            path,
            params: {
                ...params,
                $or: categoriesIds,
                limit: pagination.PAGE_SIZE
            }
        })
            .then(data => context.dispatch(actionTypes.PRODUCTS_LOAD, {
                slugs,
                ...data
            }));
    },

    getBySlug(context, params) {
        context.executeAction('progress/show', 'product-get');

        return service({
            path: '/product',
            params
        })
            .then(data => context.dispatch(actionTypes.PRODUCT_LOAD, data))
            .finally(() => context.executeAction('progress/hide', 'product-get'));
    },

    search(context, params) {
        context.executeAction('progress/show', 'search');

        return service({
            path,
            params: {
                ...defaultParams,
                ...params
            }
        })
            .then(data => context.dispatch(actionTypes.PRODUCTS_SEARCH, data))
            .finally(() => context.executeAction('progress/hide', 'search'));
    },

    setActiveProduct(context, params) {
        return context.dispatch(actionTypes.PRODUCT_SET_ACTIVE, params.slug);
    },

    unsetActiveProduct(context) {
        return context.dispatch(actionTypes.PRODUCT_UNSET_ACTIVE);
    },

    getVariantId(context, { parent_id, option_value_ids }) {
        return service({
            path: `/product/${parent_id}/variants`,
            params: {
                option_value_ids
            }
        })
    }
};
