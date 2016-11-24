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
import gaze from 'gaze';
import replace from 'replace';
import Promise from 'bluebird';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy({ watch } = {}) {
    const ncp = Promise.promisify(require('ncp'));

    await Promise.all([
        ncp('servers/static/public', 'build/public'),
        ncp('src/images', 'build/public/images'),
        ncp('src/content', 'build/content'),
        ncp('package.json', 'build/package.json'),
        ncp('servers/api/email', 'build/email')
    ]);

    replace({
        regex: '"start".*',
        replacement: '"start": "node static-server.js"',
        paths: ['build/package.json'],
        recursive: false,
        silent: false
    });

    if (watch) {
        const watcher = await new Promise((resolve, reject) => {
            gaze('src/content/**/*.*', (err, val) => err ? reject(err) : resolve(val));
        });

        watcher.on('changed', async(file) => {
            const relPath = file.substr(path.join(__dirname, '../src/content/').length);

            await ncp(`src/content/${relPath}`, `build/content/${relPath}`);
        });
    }
}

export default copy;
