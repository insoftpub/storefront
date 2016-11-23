import Store from './Store';
import actionTypes from '../constants/actionTypes.js';
import { findLast, last } from 'lodash';
import { isBackPointPath, parseNavigation } from './parsers/navigation';

const DEFAULT_BACK_PATH = '/';

class NavigationStore extends Store {
    static storeName = 'navigation';

    static handlers = {
        [actionTypes.NAVIGATE_END]: 'navigateEnded',
        [actionTypes.NAVIGATE_PATH_CHANGE]: 'navigatePathChanged',
        [actionTypes.NAVIGATE_LOAD]: 'navigationLoaded',
        [actionTypes.NAVIGATE_SET_START_PAGE]: 'navigateStartPageSetted'
    };

    initialize() {
        this.history = [{
            path: DEFAULT_BACK_PATH,
            isBackPoint: true
        }];
        this.navigation = [];
    }

    getState() {
        return {
            backPath: findLast(this.history, { isBackPoint: true }).path,
            path: last(this.history).path,
            navigation: this.navigation
        };
    }

    navigationLoaded(data) {
        this.navigation = parseNavigation(data);

        this.emit('change');
    }

    navigateEnded(payload) {
        const path = typeof payload === "string" ? payload : payload.pathname;

        this.history.push({
            path,
            isBackPoint: isBackPointPath(path)
        });

        this.emit('change');
    }

    navigatePathChanged(path = '') {
        this.history.push({
            path,
            isBackPoint: false
        });
    }

    navigateStartPageSetted(path = '') {
        this.history.push({
            path,
            isBackPoint: isBackPointPath(path)
        });

        this.emit('change');
    }

    dehydrate() {
        return {
            history: this.history,
            navigation: this.navigation
        };
    }
}

export default NavigationStore;
