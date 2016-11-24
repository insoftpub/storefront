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

import keyMirror from 'fbjs/lib/keyMirror';

export default keyMirror({
    // Users
    USER_LOGIN: null,
    USER_REGISTER: null,
    USER_LOGOUT: null,
    USER_GET: null,

    // Products list
    PRODUCTS_LOAD: null,
    PRODUCTS_SEARCH: null,

    // Product
    PRODUCT_LOAD: null,
    PRODUCT_SET_ACTIVE: null,
    PRODUCT_UNSET_ACTIVE: null,
    PRODUCT_VARIANTS_LOADED: null,

    // Categories
    CATEGORIES_LOAD: null,

    // Progress bar
    PROGRESS_SHOW: null,
    PROGRESS_HIDE: null,

    // Navigation
    NAVIGATE_END: null,
    NAVIGATE_PATH_CHANGE: null,
    NAVIGATE_SET_START_PAGE: null,
    NAVIGATE_LOAD: null,

    // Session
    SESSION_SAVE: null,
    SESSION_RESTORE: null,

    // Cart
    CART_CREATE: null,
    CART_DELETE: null,
    CART_CLEAR: null,
    CART_LOAD: null,
    CART_PRODUCT_ADD: null,
    CART_PRODUCT_REMOVE: null,
    CART_ITEM_QUANT_CHANGE: null,

    // Orders
    ORDER_CREATE: null,
    ORDER_LOAD: null
});
