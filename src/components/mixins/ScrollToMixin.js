import { isElement, isString } from 'lodash';
import animation from '../../utils/animations';

var animateId;

export default {
    getToByTarget({ target, from }) {
        let to, rect;

        switch (target) {
        case '$top':
            to = 0;
            break;
        case '$bottom':
            to = document.height || document.documentElement.clientHeight;
            break;
        default:
            rect = target.getBoundingClientRect && target.getBoundingClientRect();
            to = rect ? from + rect.top : 0;
        }

        return to;
    },

    getHashTarget(selector) {
        try {
            return document.querySelector(selector);
        } catch (e) {
            return undefined;
        }
    },

    scrollTo(options = {}) { // eslint-disable-line complexity
        const
            document = window.document,
            html = document.documentElement,
            body = document.body,
            opts = Object.assign({
                animate: true,
                duration: 300,
                target: options.target || '$top',
                hash: '',
                extraHeight: 0
            }, options),
            hashTarget = this.getHashTarget(opts.hash),
            target = hashTarget || opts.target;

        let setScrollTop = val => {
                body.scrollTop = val;
                html.scrollTop = val;
            },
            from = body.scrollTop || html.scrollTop,
            to,
            layout;

        if (isElement(opts.scrollContainer)) {
            layout = opts.scrollContainer;
        } else {
            layout = isString(opts.scrollContainer)
                ? document.querySelector(opts.scrollContainer)
                : null;
        }

        if (layout) {
            setScrollTop = val => layout.scrollTop = val;
            from = layout.scrollTop;
        }

        to = this.getToByTarget({ target, from }) || options.to || 0;

        animateId && animation.cancel(animateId);

        to -= opts.extraHeight;

        if (opts.animate) {
            animateId = animation({
                duration: opts.duration,
                transition: 'circOut',
                step: delta => {
                    var result = (to - from) * delta + from;

                    options.callback && options.callback();

                    setScrollTop(result);
                },
                complete: opts.complete
            });
        } else {
            setScrollTop(to);
        }
    }
};
