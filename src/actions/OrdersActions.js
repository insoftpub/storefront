import actionTypes from '../constants/actionTypes';
import service from '../services/api';
import Promise from 'bluebird';
import { generateOrderNumber } from '../utils/orders';

export default {
    create(
        context, {
            user,
            products,
            cartId,
            contactInfo: { state, address1, city, ...profileInfo }
        }
    ) {
        context.executeAction('progress/show', 'order-create');
        return service({
            path: '/orders',
            method: 'POST',
            params: {
                account_id: user.id,
                billing: user.billing,
                items: products,
                num: generateOrderNumber(),
                shipping: {
                    state,
                    city,
                    address1
                },
                ...profileInfo
            }
        })
            .then(data => {
                const params = {
                    type: 'order',
                    data: {
                        ...data,
                        products
                    }
                };

                context.executeAction('email/send', { email: user.email, ...params });
                context.executeAction('email/sendInvoice', params);

                return Promise.all([
                    context.executeAction('cart/delete', { id: cartId }),
                    context.dispatch(actionTypes.ORDER_CREATE, data)
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

