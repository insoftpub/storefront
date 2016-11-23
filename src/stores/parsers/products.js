import {
    cloneDeep,
    map,
    forEach,
    last,
    sortBy,
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
    }
}

function parseVariants(product) {
    if (!product.variants) {
        return {};
    }
    
    return {
        variants: reduce(product.variants.results, (memo, variant) => [...memo, variant], [])
    };
}

function parseProduct(product, { parseRecommended = false } = {}) {
    let newProduct = omit(product, ['options', 'recommended_products', 'variants']);

    if (parseRecommended) {
        newProduct.recommendedProducts = getRecommendedProducts(product);
    }

    newProduct = { ...newProduct, ...parseOptions(product), ...parseVariants(product) };

    return newProduct;
}

export {
    parseProducts,
    parseProduct
};
