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

import 'babel-polyfill';
import ReactDOM from 'react-dom';
import Router from './routes';
import Location from './core/Location';
import { addEventListener } from './core/DOMUtils';
import Context from './Context';
import { unset } from 'lodash';

const
    appContainer = document.getElementById('app'),
    context = new Context();

// Restore the server context and deletes the corresponding properties window
context.rehydrate(window.CONTEXT);
unset(window, 'CONTEXT');

let
    trackPageView = () => (trackPageView = () => window.ga('send', 'pageView')),
    updatePageView = (url) => (updatePageView = (url) => window.ga('set', 'page', url));

function render(state) {
    Router.dispatch(state, (newState, component) => {
        ReactDOM.render(component, appContainer, () => {
            window.scrollTo(0, 0);
            updatePageView(state.path);
            trackPageView();
        });
    });
}

function run() {
    let currentState = null;

    // Re-render the app when window.location changes
    const unlisten = Location.listen(location => {
        currentState = {
            ...location.state,
            path: location.pathname,
            query: location.query,
            context
        };

        if (window.location.hash && window.location.hash === '#_=_') {
            window.location.hash = '';
        }

        render(currentState);
    });

    addEventListener(window, 'pagehide', () => {
        unlisten();
    });
}

// Run the application when both DOM is ready and page content is loaded
if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
    run();
} else {
    document.addEventListener('DOMContentLoaded', run, false);
}
