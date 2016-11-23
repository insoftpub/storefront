import actionTypes from '../constants/actionTypes.js';

export default {
    add(context, index) {
        return context.dispatch(actionTypes.ERROR_ADDED, index);
    },

    remove(context) {
        return context.dispatch(actionTypes.ERROR_REMOVED);
    }
};
