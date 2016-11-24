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
