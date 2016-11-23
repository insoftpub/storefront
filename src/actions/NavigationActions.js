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
