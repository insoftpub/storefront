import actionTypes from '../constants/actionTypes';
import Store from './Store';

class OrdersStore extends Store {
    static storeName = 'orders';

    static handlers = {
        [actionTypes.ORDER_CREATE]: 'handleOrderCreate',
        [actionTypes.ORDER_LOAD]: 'handleOrderLoad'
    };

    initialize() {
        this.orders = [];
        this.loaded = false;
    }

    getState() {
        return {
            orders: this.orders,
            loaded: this.loaded
        };
    }

    handleOrderCreate(data) {}

    handleOrderLoad(data) {
        this.orders = data.results;

        if (!this.loaded) {
            this.loaded = true;
        }

        this.emit('change');
    }

    dehydrate() {
        return {
            orders: this.orders,
            loaded: this.loaded
        };
    }
}

export default OrdersStore;
