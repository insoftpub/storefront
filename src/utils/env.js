const
    canUseDOM = !!(
        typeof window !== 'undefined'
        && window.document
        && window.document.createElement
    ),
    canUseWorkers = typeof Worker !== 'undefined',
    canUseEventListeners = canUseDOM && !!(window.addEventListener || window.attachEvent),
    canUseViewport = canUseDOM && !!window.screen;

export {
    canUseDOM,
    canUseWorkers,
    canUseEventListeners,
    canUseViewport
};
