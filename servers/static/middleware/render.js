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

import ReactDOM from 'react-dom/server';
import Router from '../../../src/routes';
import ServerContext from '../ServerContext';
import { analytics } from '../config.js';

let indexTemplate = require('../views/index.jade');

async function render(req, res, next) {
    try {
        const
            context = new ServerContext({ req, res }),
            data = context.getData(),
            css = context.getCss(),

            // deploy environment for client side
            env = {
                HOST: process.env.HOST,
                PORT: process.env.PORT,
                API_URL: process.env.API_URL
            };

        if (process.env.NODE_ENV === 'production') {
            data.trackingId = analytics.google.trackingId;
        }

        await Router.dispatch({ path: req.path, query: req.query, context, isServer: true }, (state, component) => {
            data.body = ReactDOM.renderToString(component);
            data.css = css.map(style => style.element).join('');
            data.script = `window.CONTEXT=${JSON.stringify(context.dehydrate())}; window.env=${JSON.stringify(env)}`;
        });

        res.status(context.getStatus());
        res.send(indexTemplate(data));
    } catch (err) {
        next(err);
    }
}

export default render;
