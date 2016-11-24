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
