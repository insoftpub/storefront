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
