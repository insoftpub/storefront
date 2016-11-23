import Store from './Store';
import actionTypes from '../constants/actionTypes';
import { keyBy, values, head, isEqual } from 'lodash';
import { parseProducts, parseProduct, getProductSizes } from './parsers/products';

class ProductsStore extends Store {
    static storeName = 'products';

    static handlers = {
        [actionTypes.PRODUCTS_LOAD]: 'productsLoaded',
        [actionTypes.PRODUCTS_SEARCH]: 'searchProductsLoaded',
        [actionTypes.PRODUCT_LOAD]: 'productLoaded',
        [actionTypes.PRODUCT_SET_ACTIVE]: 'productSetActive',
        [actionTypes.PRODUCT_UNSET_ACTIVE]: 'productUnsetActive',
        [actionTypes.PRODUCT_VARIANTS_LOADED]: 'productVariantsLoaded'
    };

    initialize() {
        this.total = 0;
        this.page = 0;
        this.productsById = {};
        this.activeProduct = null;
        this.identifier = {};
    }

    getState() {
        return {
            total: this.total,
            page: this.page,
            identifier: this.identifier,
            productsById: this.productsById,
            products: values(this.productsById),
            activeProduct: this.activeProduct
        };
    }

    searchProductsLoaded(data) {
        const products = parseProducts(data.results);

        this.productsById = {
            ...this.productsById,
            ...keyBy(products, 'id')
        };

        this.total = data.count;
        this.page = data.page;
        this.emit('change');
    }

    productsLoaded({ results, count, page, category }) {
        const products = parseProducts(results);

        if (this.category === category) {
            this.productsById = {
                ...this.productsById,
                ...keyBy(products, 'id')
            };
        } else {
            this.productsById = {
                ...keyBy(products, 'id')
            };
        }

        this.category = category;
        this.total = count;
        this.page = page;
        this.emit('change');
    }

    productLoaded(data) {
        const product = parseProduct(head(data.results), { parseRecommended: true });

        this.productsById[product.id] = product;

        this.emit('change');
    }

    productVariantsLoaded({ id, variants }) {
        this.productsById[id].sizes = getProductSizes({ variants });
        this.emit('change');
    }

    productSetActive(data) {
        this.activeProduct = data;
    }

    productUnsetActive() {
        this.activeProduct = null;
    }

    dehydrate() {
        return {
            total: this.total,
            page: this.page,
            productsById: this.productsById,
            activeProduct: this.activeProduct,
            identifier: this.identifier
        };
    }
}

export default ProductsStore;
