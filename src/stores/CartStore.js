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

import { values, find } from 'lodash';
import actionTypes from '../constants/actionTypes';
import { parseProduct } from './parsers/products';
import Store from './Store';

class CartStore extends Store {
    static storeName = 'cart';

    static handlers = {
        [actionTypes.CART_CREATE]: 'cartCreate',
        [actionTypes.CART_DELETE]: 'cartDelete',
        [actionTypes.CART_LOAD]: 'cartLoad',
        [actionTypes.CART_CLEAR]: 'cartClear',
        [actionTypes.CART_ITEM_QUANT_CHANGE]: 'quantChanged',
        [actionTypes.CART_PRODUCT_ADD]: 'cartProductAdd',
        [actionTypes.CART_PRODUCT_REMOVE]: 'cartProductRemove',
    };

    initialize() {
        this.cartLoaded = false;
        this.cartId = null;
        this.productsById = {};
        this.total = 0;
        this.currency = 'USD';
    }

    getState() {
        return {
            currency: this.currency,
            total: this.total,
            cartId: this.cartId,
            cartLoaded: this.cartLoaded,
            products: values(this.productsById)
        };
    }

    quantChanged({ id, quantity }) {
        this.productsById[id].quantity += quantity;
        this.total += this.productsById[id].price * quantity;
        this.emit('change');
    }

    cartClear() {
        this.cartId = null;
        this.productsById = {};
        this.total = 0;
        this.currency = 'USD';

        this.emit('change');
    }

    cartCreate(data) {
        this.cartId = data.id;
        this.productsById = {};

        this.emit('change');
    }

    cartDelete() {
        this.cartId = null;
        this.productsById = {};
        this.total = 0;
        this.currency = 'USD';

        this.emit('change');
    }

    cartLoad(data) {
        this.cartId = data.id;
        this.currency = data.currency;
        this.total = data.sub_total;

        data.items && data.items.map(item => {
            this.productsById[item.id] = {
                ...item,
                product: parseProduct(item.product, { parseRecommended: true })
            };
        });

        if (!this.cartLoaded) {
            this.cartLoaded = true;
        }

        this.emit('change');
    }

    cartProductAdd({ product, ...data }) {
        if (this.cartId === data.cart_id) {
            let variantObj = {};

            if (data.variant_id) {
                const variant = find(product.variants, { id: data.variant_id });

                if (variant) {
                    variantObj = { variant };
                }
            }

            this.productsById[data.id] = {
                ...data,
                product,
                ...variantObj
            };
            this.total += data.price_total;

            this.emit('change');
        }
    }

    cartProductRemove(data) {
        if (this.cartId === data.cart_id && this.productsById[data.id]) {
            delete this.productsById[data.id];
            this.total -= data.price_total;

            this.emit('change');
        }
    }

    dehydrate() {
        return {
            cartLoaded: this.cartLoaded,
            cartId: this.cartId,
            productsById: this.productsById,
            total: this.total,
            currency: this.currency
        };
    }
}

export default CartStore;
