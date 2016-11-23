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
            path: `/accounts/${params.id}`,
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
