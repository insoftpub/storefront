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

