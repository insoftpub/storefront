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

import ActionTypes from '../constants/actionTypes.js';
import Location from '../core/Location';
import service from '../services/api';
import Promise from 'bluebird';

export default {
    list(context, params) {
        return service({
            path: '/categories',
            params: {
                limit: -1,
                active: true,
                navigation: true,
                fields: 'active, id, slug, parent_id, name, type',
                ...params
            }
        })
            .then(data => {
                return Promise.all([
                    context.dispatch(ActionTypes.NAVIGATE_LOAD, data),
                    context.dispatch(ActionTypes.CATEGORIES_LOAD, data)
                ])
                    .then(() => data);
            });
    },

    to(context, { url, reload = false, assign = false } = {}) {
        if (reload) {
            window.location.replace(url);

            return Promise.resolve();
        }

        if (assign) {
            window.location.assign(url);

            return Promise.resolve();
        }

        Location.push(url);

        return context.dispatch(ActionTypes.NAVIGATE_END, url);
    },

    changePath(context, params) {
        window.history.pushState(null, null, params);

        return context.dispatch(ActionTypes.NAVIGATE_PATH_CHANGE, params);
    },

    back(context) {
        window.history.back();
    },

    setStartPage(context, params) {
        return context.dispatch(ActionTypes.NAVIGATE_SET_START_PAGE, params);
    }
};
