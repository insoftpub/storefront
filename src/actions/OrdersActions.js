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
import { generateOrderNumber } from '../utils/orders';
import { map, head } from 'lodash';

export default {
    create(context, {
        user,
        products,
        cartId,
        ...contactInfo
    }) {
        context.executeAction('progress/show', 'order-create');

        return service({
            path: '/orders',
            method: 'POST',
            params: {
                account_id: user.id,
                cart_id: cartId,
                order_number: generateOrderNumber(),
                items: map(products, product => ({ product_id: product.product_id })),
                ...contactInfo
            }
        })
            .then(({ order_number, grand_total, shipment_price, sub_total }) => {
                const params = {
                    type: 'order',
                    data: {
                        order_number,
                        grand_total,
                        sub_total,
                        shipment_price,
                        products: map(products, ({ product, price, variant }) => ({
                            sku: product.sku,
                            image: head(product.images),
                            manufacturer_name: product.manufacturer_name || '',
                            name: product.name,
                            price,
                            variant
                        })),
                        ...contactInfo
                    }
                };

                context.executeAction('email/send', { email: user.email, ...params });
                context.executeAction('email/sendInvoice', params);

                return Promise.all([
                    context.executeAction('cart/delete', { id: cartId }),
                    context.dispatch(actionTypes.ORDER_CREATE, { order_number, grand_total, sub_total, shipment_price })
                ]);
            })
            .finally(() => context.executeAction('progress/hide', 'order-create'));
    },

    list(context, params) {
        context.executeAction('progress/show', 'orders-list');

        return service({
            path: `/orders`,
            params: {
                account_id: params.accountId,
                limit: 16
            }
        })
            .then(data => {
                context.dispatch(actionTypes.ORDER_LOAD, data);
                return data;
            })
            .finally(() => context.executeAction('progress/hide', 'orders-list'));
    }
};

