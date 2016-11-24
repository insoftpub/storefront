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

import Promise from 'bluebird';
import { setCookieClient, deleteCookie, getCookieClient } from '../utils/cookie';

export default {
    addAccount(context, params) {
        const cartId = getCookieClient('cart_id');

        setCookieClient('account_id', params.id);

        if (cartId) {
            deleteCookie('cart_id');

            return context.executeAction('user/update', {
                cart_id: cartId,
                id: params.id
            });
        } else {
            if (params.cart_id) {
                return context.executeAction('cart/get', { id: params.cart_id });
            } else {
                return Promise.resolve();
            }
        }
    },

    deleteAccount(context) {
        deleteCookie('account_id');

        return Promise.resolve();
    },

    deleteCart(context) {
        const accountId = getCookieClient('account_id');

        if (accountId) {
            return context.executeAction('user/update', {
                id: accountId,
                $unset: 'cart_id'
            });
        } else {
            deleteCookie('cart_id');

            return Promise.resolve();
        }
    },

    addCart(context, params) {
        const accountId = getCookieClient('account_id');

        if (accountId) {
            return context.executeAction('user/update', {
                cart_id: params.id,
                id: accountId
            });
        } else {
            setCookieClient('cart_id', params.id);

            return Promise.resolve();
        }
    },

    restore(context) {
        let defer;
        const
            accountId = getCookieClient('account_id'),
            cartId = getCookieClient('cart_id');

        context.executeAction('progress/show', 'session-restore');

        if (accountId) {
            if (cartId) {
                defer = context.executeAction('user/update', { id: accountId, cart_id: cartId })
                    .then(userData => context.executeAction('cart/get', { id: cartId }));
            } else {
                defer = context.executeAction('user/get', { id: accountId })
                    .then(data => {
                        const { cart_id: cartId } = data;

                        if (cartId) {
                            return context.executeAction('cart/get', { id: cartId });
                        } else {
                            return Promise.resolve();
                        }
                    });
            }
        } else {
            const cartId = getCookieClient('cart_id');

            if (cartId) {
                defer = context.executeAction('cart/get', { id: cartId });
            } else {
                defer = Promise.resolve();
            }
        }

        return defer.finally(() => context.executeAction('progress/hide', 'session-restore'));
    }
};
