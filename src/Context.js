import dispatchr from 'dispatchr';
import stores from './stores';
import actions from './actions';
import { setImmediate } from 'setimmediate2';
import { UserAgent } from 'express-useragent/lib/express-useragent';
import { getCookieClient, setCookieClient } from './utils/cookie';
import { createId, removeCss } from './utils/styles';
import { map, reduce } from 'lodash';
import { siteName } from './config';

const
    storeNames = map(stores, item => item.storeName),
    dispatcher = dispatchr.createDispatcher({
        stores
    });

class Context {
    constructor() {
        this.dispatcher = dispatcher.createContext();

        this.getStore = this.getStore.bind(this);
        this.insertCss = this.insertCss.bind(this);
        this.removeCss = this.removeCss.bind(this);
        this.executeAction = this.executeAction.bind(this);
        this.dispatch = this.dispatch.bind(this);
        this.dehydrate = this.dehydrate.bind(this);
        this.styles = {};
    }

    getUserAgent() {
        return new UserAgent().parse(navigator.userAgent);
    }

    getCookie(name) {
        return getCookieClient(name);
    }

    setCookie(name, value) {
        return setCookieClient(name, value);
    }

    insertCss(styles) {
        const
            id = createId(styles),
            styleExists = !!this.styles[id]
                || !!document.getElementById(id);

        if (styleExists) {
            this.styles[id]++;

            return this.removeCss.bind(this, id);
        } else {
            let element = document.createElement('style');

            this.styles[id] = 1;
            element.setAttribute('type', 'text/css');
            element.id = id;
            element.textContent = styles._getCss();
            document.head.appendChild(element);

            return this.removeCss.bind(this, id);
        }
    }

    removeCss(id) {
        this.styles[id]--;

        if (this.styles[id] === 0) {
            const element = document.getElementById(id);

            removeCss(element);
        }
    }

    setTitle(value) {
        document.title = `${value} - ${siteName}`;
    }

    // Remove and create a new <meta /> tag in order to make it work
    // with bookmarks in Safari
    onSetMeta(name, content, key = 'name') {
        const
            meta = document.createElement('meta'),
            elements = document.getElementsByTagName('meta');

        Array.from(elements).forEach(element => {
            if (element.getAttribute(key) === name) {
                element.parentNode.removeChild(element);
            }
        });

        meta.setAttribute(key, name);
        meta.setAttribute('content', content);
        document
            .getElementsByTagName('head')[0]
            .appendChild(meta);
    }

    getStore(storeName) {
        try {
            return this.dispatcher.getStore.call(this.dispatcher, storeName);
        } catch (e) {
            console.error(e); // eslint-disable-line no-console
            return e;
        }
    }

    executeAction(action, params = {}) {
        const [actionName, method] = action.split('/');

        return actions[actionName][method](this, params);
    }

    dispatch(name, payload) {
        return new Promise((resolve, reject) => {
            setImmediate(() => {
                try {
                    resolve(this.dispatcher.dispatch(name, payload));
                } catch (err) {
                    console.error(name + ' ' + err); // eslint-disable-line no-console
                    reject(err);
                }
            });
        });
    }

    dehydrate() {
        return reduce(storeNames, (memo, storeName) => {
            try {
                return {
                    ...memo,
                    [storeName]: this.getStore(storeName).dehydrate()
                };
            } catch (error) {
                return {
                    storeName,
                    error,
                    store: this.getStore(storeName)
                };
            }
        }, {});
    }

    rehydrate(stores) {
        for (let name in stores) {
            this.getStore(name).rehydrate(stores[name]);
        }
    }
}

export default Context;
