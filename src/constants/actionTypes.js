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
