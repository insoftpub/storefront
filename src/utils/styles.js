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

import { findIndex, reduce } from 'lodash';

const prefix = 'css-';

export function addStyle(styles, css) {
    const style = processStyles(styles);

    findIndex(css, { id: style.id }) === -1 && css.push(style);
}

export function processStyles(styles) {
    const
        id = createId(styles),
        element = `<style type='text/css' id=${id}>${styles._getCss()}</style>`;

    return {
        id,
        element
    };
}

export function createId(styles) {
    const uniq = reduce(styles, (res, item, key) => {
        if (typeof item !== 'function') {
            res += item;
        }

        return res;
    }, '');

    return prefix + uniq;
}

export function removeCss(element) {
    element.parentNode.removeChild(element);
}
