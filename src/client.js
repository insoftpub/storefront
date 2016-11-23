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

function render(state) {
    Router.dispatch(state, (newState, component) => {
        ReactDOM.render(component, appContainer, () => {
            window.scrollTo(0, 0);
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
