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

/* eslint-disable no-magic-numbers */

var transition = {
        linear: progress => progress,
        quad: progress => Math.pow(progress, 2),
        circ: progress => 1 - Math.sin(Math.acos(progress)),
        back: (progress, x) => Math.pow(progress, 2) * ((x + 1) * progress - x),
        sine: progress => 1 - Math.sin((1 - progress) * Math.PI / 2),
        elastic: (progress, x) => Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress)
    },
    uid = 0,
    animations = {},
    i;

for (i in transition) {
    transition[i + 'Out'] = makeOut(transition[i]);
    transition[i + 'InOut'] = makeEaseInOut(transition[i]);
}

export default function animate(options) {
    var start = new Date(),
        delta = transition[options.transition] || transition['linear'],
        id = 'animations_' + (++uid);

    animations[id] = window.requestAnimationFrame(tick);

    function tick() {
        var progress = Math.min((new Date() - start) / options.duration, 1);

        options.step(delta(progress));

        if (progress === 1) {
            options.complete && options.complete();
        } else {
            animations[id] = global.window.requestAnimationFrame(tick);
        }
    }

    return id;
}

function cancel(id) {
    global.window.cancelAnimationFrame(animations[id]);
    delete animations[id];
}

function makeOut(delta) {
    return progress => 1 - delta(1 - progress);
}

function makeEaseInOut(delta) {
    return progress => (progress < 0.5) ? delta(2 * progress) / 2 : (2 - delta(2 * (1 - progress))) / 2;
}

animate.cancel = cancel;

