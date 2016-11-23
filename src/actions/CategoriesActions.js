import actionTypes from '../constants/actionTypes.js';
import service from '../services/api';

export default {
    list(context, params) {
        return service({
            path: '/categories',
            params
        })
            .then(data => {
                return Promise.all([
                    context.dispatch(actionTypes.NAVIGATE_LOAD, data),
                    context.dispatch(actionTypes.CATEGORIES_LOAD, data)
                ])
                    .then(() => data);
            });
    }
};
