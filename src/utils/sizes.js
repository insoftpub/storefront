const sizesMap = {
    '35': '34',
    '35.5': '34.5',
    '36': '35',
    '36.5': '36',
    '37': '36.5',
    '37.5': '37',
    '38': '37.5',
    '38.5': '38',
    '39': '39',
    '39.5': '39.5',
    '40': '40',
    '40-41': '40',
    '41': '41',
    '41-42': '41.5',
    '42': '42',
    '42-43': '42.5'
};

export function getSizes(product) {
    return product.sizes.map(size => ({
        ...size,
        disabled: !size.isAvailable,
        selectable: size.isAvailable
    }));
}

export function getNoStockSizes(product) {
    return product.sizes.map(size => ({
        ...size,
        disabled: false,
        selectable: true
    }));
}

export function convertToRussianSizes(sizes) {
    return sizes.map(size => ({
        ...size,
        name: sizesMap[size.name] || size.name
    }));
}

