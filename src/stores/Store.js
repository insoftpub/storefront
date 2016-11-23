import EventEmitter from 'eventemitter3';
import { forEach } from 'lodash';

class Store extends EventEmitter {
    constructor(dispatcher) {
        super();

        this.dispatcher = dispatcher;
        this.initialize();
    }

    initialize() {}

    dehydrate() {
        return {};
    }

    rehydrate(data = {}) {
        forEach(data, (value, propName) => this[propName] = value);
    }
}

export default Store;
