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

