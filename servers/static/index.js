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

import 'babel-polyfill';
import express from 'express';
import path from 'path';
import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import serversConfig from '../config';
import errorHandler from './middleware/errorHandler';
import render from './middleware/render';
import auth from './middleware/auth';
import graphql from './middleware/graphql';
import token from './middleware/token';
import { CACHE_MAX_AGE } from './config';

const server = global.server = express();

// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

// Register Node.js middleware
server.use(express.static(path.join(__dirname, 'public'), {
    maxAge: CACHE_MAX_AGE
}));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(bodyParser.text());
server.use('/token', token);
server.use('/auth', auth);
server.use('/graphql', graphql);
server.use(useragent.express());
server.get('*', render);
server.use(errorHandler);

// Launch the server
server.listen(serversConfig.static.PORT, () => {
    console.log(`The STATIC server is running at ${serversConfig.static.HOST}:${serversConfig.static.PORT}/`);
});
