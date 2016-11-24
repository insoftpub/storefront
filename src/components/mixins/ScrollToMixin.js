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
