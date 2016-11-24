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

import path from 'path';
import cp from 'child_process';
import webpackConfig from './webpack.config';

// Should match the text string used in `servers/static/index.js/server.listen(...)`
const RUNNING_REGEXP = /The STATIC server is running at http:\/\/(.*?)\//;

let server;
const { output } = webpackConfig.find(x => x.target === 'node');
const serverPath = path.join(output.path, output.filename);

// Launch or restart the Node.js server
function runServer(cb) {
    function onStdOut(data) {
        const time = new Date().toTimeString();
        const match = data.toString('utf8').match(RUNNING_REGEXP);

        process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
        process.stdout.write(data);

        if (match) {
            server.stdout.removeListener('data', onStdOut);
            server.stdout.on('data', x => process.stdout.write(x));
            if (cb) {
                cb(null, match[1]);
            }
        }
    }

    if (server) {
        server.kill('SIGTERM');
    }

    server = cp.spawn('node', [serverPath], {
        env: Object.assign({ NODE_ENV: 'development' }, process.env),
        silent: false
    });

    server.stdout.on('data', onStdOut);
    server.stderr.on('data', x => process.stderr.write(x));
}

process.on('exit', () => {
    if (server) {
        server.kill('SIGTERM');
    }
});

export default runServer;
