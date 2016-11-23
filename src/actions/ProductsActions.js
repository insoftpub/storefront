import actionTypes from '../constants/actionTypes.js';
import service from '../services/api';
import { pagination } from '../config';
import { createProductsQueryNew } from '../utils/query';
import { keys, orderBy, map } from 'lodash';

const
    path = '/products',
    defaultParams = {
        active: true
    };

export default {
    list(context, { ...params } = {}) {
        return service({
            path,
            params: {
                ...params,
                limit: pagination.PAGE_SIZE
            }
        })
            .then(data => context.dispatch(actionTypes.PRODUCTS_LOAD, {
                // The object used to detect if the new products should be concated or replaced
                category: params.category_id,
                ...data
            }));
    },

    getByCategoriesIds(context, { categoriesIds, slugs, ...params }) {
        return service({
            path,
            params: {
                ...params,
                $or: categoriesIds,
                limit: pagination.PAGE_SIZE
            }
        })
            .then(data => context.dispatch(actionTypes.PRODUCTS_LOAD, {
                slugs,
                ...data
            }));
    },

    getBySlug(context, params) {
        context.executeAction('progress/show', 'product-get');

        return service({
            path: '/product',
            params
        })
            .then(data => context.dispatch(actionTypes.PRODUCT_LOAD, data))
            .finally(() => context.executeAction('progress/hide', 'product-get'));
    },

    search(context, params) {
        context.executeAction('progress/show', 'search');

        return service({
            path,
            params: {
                ...defaultParams,
                ...params
            }
        })
            .then(data => context.dispatch(actionTypes.PRODUCTS_SEARCH, data))
            .finally(() => context.executeAction('progress/hide', 'search'));
    },

    setActiveProduct(context, params) {
        return context.dispatch(actionTypes.PRODUCT_SET_ACTIVE, params.slug);
    },

    unsetActiveProduct(context) {
        return context.dispatch(actionTypes.PRODUCT_UNSET_ACTIVE);
    },

    getVariantId(context, { parent_id, option_value_ids }) {
        return service({
            path: `/product/${parent_id}/variants`,
            params: {
                option_value_ids
            }
        })
    }
};
