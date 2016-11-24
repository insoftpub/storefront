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

import { mapValues, isEmpty, head } from 'lodash';
import actionTypes from '../constants/actionTypes.js';
import service from '../services/api';
import { userErrorsParser } from '../utils/user';
import Promise from 'bluebird';

export default {
    login(context, params) {
        context.executeAction('progress/show', 'user-login');

        return service({
            path: `/accounts/${params.email}`,
            params
        })
            .then(data => {
                if (data.id) {
                    context.dispatch(actionTypes.USER_LOGIN, data);
                    context.executeAction('session/addAccount', data);

                    return data;
                } else {
                    throw Error("Неправильный e-mail или пароль.");
                }
            })
            .finally(() => context.executeAction('progress/hide', 'user-login'));
    },

    register(context, params) {
        context.executeAction('progress/show', 'user-register');

        return service({
            path: "/accounts",
            params,
            method: "POST"
        })
            .then(data => {
                if (data.errors) {
                    const proxyError = new Error('Cannot create new user');

                    proxyError.name = 'user_error';
                    proxyError.details = mapValues(data.errors, error => userErrorsParser(error));

                    return Promise.reject(proxyError);
                } else {
                    context.dispatch(actionTypes.USER_REGISTER, data);
                    context.executeAction('session/addAccount', data);

                    return data;
                }
            })
            .finally(() => context.executeAction('progress/hide', 'user-register'));
    },

    logout(context) {
        return Promise.all([
            context.executeAction('session/deleteAccount'),
            context.executeAction('cart/clear'),
            context.dispatch(actionTypes.USER_LOGOUT)
        ]);
    },

    get(context, params) {
        return service({
            path: `/accounts/${params.id || params.email}`,
            params
        })
            .then(data => {
                context.dispatch(actionTypes.USER_GET, data);

                return data;
            });
    },

    find(context, params) {
        context.executeAction('progress/show', 'user-find');

        return service({
            path: '/accounts',
            params
        })
            .then(data => {
                context.executeAction('progress/hide', 'user-find');

                if (!isEmpty(data.results)) {
                    context.dispatch(actionTypes.USER_GET, head(data.results));
                }

                return head(data.results);
            });
    },

    update(context, params) {
        context.executeAction('progress/show', 'user-update');

        return service({
            path: `/accounts/${params.id || params.email}`,
            params,
            method: "PUT"
        })
            .then(data => {
                if (data.errors) {
                    const proxyError = new Error('Cannot update user');

                    proxyError.name = 'user_error';
                    proxyError.details = mapValues(data.errors, error => userErrorsParser(error));

                    return Promise.reject(proxyError);
                } else {
                    return context.dispatch(actionTypes.USER_GET, data);
                }
            })
            .finally(() => context.executeAction('progress/hide', 'user-update'));
    }
};
