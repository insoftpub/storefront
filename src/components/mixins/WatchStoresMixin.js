const
    storesListeners = {},
    storesCallbacks = {};

function storeListener(storeName) {
    return (...args) => {
        (storesCallbacks[storeName] || []).forEach(listener => listener(...args));
    };
}

function watchStores(...storesName) {
    return {
        componentWillMount() {
            if (this.getStoresState) {
                this.setState(this.getStoresState());
            }

            this.handleStoreChange = this.handleStoreChange.bind(this);
        },

        componentDidMount() {
            this.getWatchStores((storeName, store) => {
                if (!storesListeners[storeName]) {
                    var listener = storeListener(storeName);

                    storesListeners[storeName] = listener;
                    storesCallbacks[storeName] = [];
                    store.on('change', listener);
                }

                storesCallbacks[storeName].push(this.handleStoreChange);
            });
            this.componentIsMounted = true;

        },

        componentWillUnmount() {
            this.getWatchStores((storeName, store) => {
                var callbacks = [];

                storesCallbacks[storeName].forEach(callback => {
                    if (callback !== this.handleStoreChange) {
                        callbacks.push(callback);
                    }
                });

                storesCallbacks[storeName] = callbacks;

                if (!callbacks.length) {
                    store.removeListener('change', storesListeners[storeName]);
                    storesListeners[storeName] = undefined;
                    storesCallbacks[storeName] = undefined;
                }
            });
            this.componentIsMounted = false;
        },

        handleStoreChange() {
            this.componentIsMounted && this.setState(this.getStoresState ? this.getStoresState() : {});
        },

        getWatchStores(cb) {
            storesName.forEach(storeName => cb(storeName, (this.context.getStore || this.props.context.getStore)(storeName)));
        }
    };
}

export default watchStores;
