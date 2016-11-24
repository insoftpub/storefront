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

import { canUseDOM } from './utils/env';

export const
    baseUrl = process.env.HOST || (canUseDOM && window.env && window.env.HOST) || 'http://localhost:4000',
    siteName = 'Insoft',
    facebook = {
        APP_ID: '<your_facebook_app_id>'
    },
    api = {
        URL: process.env.API_URL || (canUseDOM && window.env && window.env.API_URL) || 'http://localhost:4001',
        VERSION: '/api'
    },
    pagination = {
        PAGE_SIZE: 16
    },
    mail = 'info@insoftgroup.com',
    routes = {
        HOME: '/',
        ABOUT: '/about',
        PRODUCTS: '/products',
        PRODUCT: '/product',
        CATEGORY: '/category',
        CHECKOUT: '/checkout',
        SUPPORT: '/support',
        LOGIN: '/login',
        REGISTER: '/register',
        NEWSLETTER: '/newsletter',
        FORGOTTEN_PASSWORD: '/forgotten-password',
        PROFILE: '/profile',
        SEARCH: '/search',
        RESET_PASSWORD: '/reset',
        CART: '/cart',
        CHECKOUT_SUCCESS: '/checkout/success',
        FACEBOOK_AUTH: '/auth/facebook',
        FACEBOOK_SHARE: 'http://www.facebook.com/sharer.php?u=',
        VK_SHARE: 'http://vk.com/share.php?url=',
        GOOGLE_PLUS_SHARE: 'https://plus.google.com/share?url=',
        PINTEREST_SHARE: 'http://www.pinterest.com/pin/create/button/?media=',
        TWITTER_SHARE: 'https://twitter.com/intent/tweet?text='
    },
    emptyLayoutPages = [
        'error',
        'notFound',
        'checkout'
    ],
    mobilePagesWithFooter = [
        'home',
        'category',
        'product'
    ],
    mobilePagesWithBackIcon = [
        'product',
        'newsletter',
        'login',
        'register',
        'forgottenPassword',
        'cart',
        'checkout'
    ],
    deliveryRegions = [
        'region1',
        'region2',
        'region3'
    ];
