import actionTypes from '../constants/actionTypes.js';

export default {
    show(context, index) {
        return context.dispatch(actionTypes.PROGRESS_SHOW, index);
    },

    hide(context, index) {
        return context.dispatch(actionTypes.PROGRESS_HIDE, index);
    }
};
