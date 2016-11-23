import Store from './Store';
import actionTypes from '../constants/actionTypes.js';
import { isEmpty, unset } from 'lodash';

class ProgressStore extends Store {
    static storeName = 'progress';

    static handlers = {
        [actionTypes.PROGRESS_SHOW]: 'showProgress',
        [actionTypes.PROGRESS_HIDE]: 'hideProgress'
    };

    initialize() {
        this.progress = {};
    }

    getState() {
        return {
            showProgress: !isEmpty(this.progress)
        };
    }

    showProgress(index) {
        this.progress[index] = true;
        this.emit('change');
    }

    hideProgress(index) {
        unset(this.progress, index);
        this.emit('change');
    }

    dehydrate() {
        return {
            progress: this.progress
        };
    }

    rehydrate(data = {}) {
        this.progress = {};
    }
}

export default ProgressStore;
