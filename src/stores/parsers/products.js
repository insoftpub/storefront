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

import {
    map,
    omit,
    head,
    isEmpty,
    reduce
} from 'lodash';

function getRecommendedProducts({ recommended_products: products }) {
    if (isEmpty(products) || isEmpty(head(products).product)) {
        return [];
    }

    return map(products, ({ product }) => product && parseProduct(product));
}

function parseProducts(products) {
    return map(products, product => parseProduct(product));
}

function parseOptions({ options }) {
    return {
        options: reduce(options, (memo, option) => ({
            ...memo,
            [option.name]: option.values
        }), {})
    };
}

function parseVariants(product) {
    if (!product.variants) {
        return {};
    }

    return {
        variants: reduce(product.variants.results, (memo, variant) => [...memo, variant], [])
    };
}

function parseImages(product) {
    return {
        images: map(product.images, v => ({ url: v.file && v.file.url }))
    };
}

function parseProduct(product, { parseRecommended = false } = {}) {
    let newProduct = omit(product, ['options', 'recommended_products', 'variants']);

    if (parseRecommended) {
        newProduct.recommendedProducts = getRecommendedProducts(product);
    }

    newProduct = { ...newProduct, ...parseOptions(product), ...parseVariants(product), ...parseImages(product) };

    return newProduct;
}

export {
    parseProducts,
    parseProduct
};
