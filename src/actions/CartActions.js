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
import service from '../services/api';
import Promise from 'bluebird';

export default {
    create(context, params) {
        context.executeAction('progress/show', 'cart-create');

        return service({
            path: '/carts',
            method: 'POST',
            params
        })
            .then(data => {
                Promise.all([
                    context.executeAction('session/addCart', data),
                    context.dispatch(actionTypes.CART_CREATE, data)
                ]);

                return data;
            })
            .finally(() => context.executeAction('progress/hide', 'cart-create'));
    },

    delete(context, { id }) {
        return service({
            path: `/carts/${id}`,
            method: 'DELETE'
        })
            .then(data => Promise.all([
                context.executeAction('session/deleteCart'),
                context.dispatch(actionTypes.CART_DELETE, data)
            ]));
    },

    clear(context) {
        return context.dispatch(actionTypes.CART_CLEAR);
    },

    get(context, { id }) {
        context.executeAction('progress/show', 'cart-get');

        return service({
            path: `/carts/${id}`,
            method: 'GET'
        })
            .then(data => context.dispatch(actionTypes.CART_LOAD, data))
            .finally(() => context.executeAction('progress/hide', 'cart-get'));
    },

    addProduct(context, params) {
        context.executeAction('progress/show', 'cart-add-product');

        return service({
            path: `/carts/${params.id}/items`,
            method: 'POST',
            params: {
                cart_id: params.id,
                product_id: params.product.id,
                variant_id: params.variant_id
            }
        })
            .then(data => context.dispatch(actionTypes.CART_PRODUCT_ADD, {
                product: params.product,
                ...data
            }))
            .finally(() => context.executeAction('progress/hide', 'cart-add-product'));
    },

    changeProductCount(context, { cart_id, product_id, variant_id, quantity }) {
        return service({
            path: `/carts/${cart_id}/items`,
            method: 'POST',
            params: {
                product_id,
                variant_id,
                quantity
            }
        })
            .then(data => context.dispatch(actionTypes.CART_ITEM_QUANT_CHANGE, {
                id: data.id,
                quantity
            }));
    },

    removeProduct(context, { id, productId }) {
        context.executeAction('progress/show', 'cart-remove-product');

        return service({
            path: `/carts/${id}/items/${productId}`,
            method: 'DELETE'
        })
            .then(data => context.dispatch(actionTypes.CART_PRODUCT_REMOVE, data))
            .finally(() => context.executeAction('progress/hide', 'cart-remove-product'));
    }
};

