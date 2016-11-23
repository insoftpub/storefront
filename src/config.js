import { canUseDOM } from './utils/env';

export const
    baseUrl = process.env.HOST || (canUseDOM && window.env && window.env.HOST) || 'http://localhost:4000',
    siteName = 'storefront',
    facebook = {
        APP_ID: '<your_app_id>'
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
