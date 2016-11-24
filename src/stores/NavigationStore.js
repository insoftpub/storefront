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
