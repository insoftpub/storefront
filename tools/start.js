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

import Browsersync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import run from './run';
import runServer from './runServer';
import webpackConfig from './webpack.config';
import clean from './clean';
import copy from './copy';

const DEBUG = !process.argv.includes('--release');

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
    await run(clean);
    await run(copy.bind(undefined, { watch: true }));
    await new Promise(resolve => {
        // Patch the client-side bundle configurations
        // to enable Hot Module Replacement (HMR) and React Transform
        webpackConfig.filter(x => x.target !== 'node').forEach(config => {
            if (Array.isArray(config.entry)) {
                config.entry.unshift('webpack-hot-middleware/client');
            } else {
                /* eslint-disable no-param-reassign */
                config.entry = ['webpack-hot-middleware/client', config.entry];
                /* eslint-enable no-param-reassign */
            }

            config.plugins.push(new webpack.HotModuleReplacementPlugin());
            config.plugins.push(new webpack.NoErrorsPlugin());
            config
                .module
                .loaders
                .filter(x => x.loader === 'babel-loader')
                .forEach(x => (x.query = { // eslint-disable-line no-param-reassign
                    // Wraps all React components into arbitrary transforms
                    // https://github.com/gaearon/babel-plugin-react-transform
                    plugins: [
                        ['react-transform', {
                            transforms: [{
                                transform: 'react-transform-hmr',
                                imports: ['react'],
                                locals: ['module']
                            }, {
                                transform: 'react-transform-catch-errors',
                                imports: ['react', 'redbox-react']
                            }]
                        }]
                    ]
                }));
        });

        const bundler = webpack(webpackConfig);
        const wpMiddleware = webpackMiddleware(bundler, {

            // IMPORTANT: webpack middleware can't access config,
            // so we should provide publicPath by ourselves
            publicPath: webpackConfig[0].output.publicPath,

            // Pretty colored output
            stats: webpackConfig[0].stats

            // For other settings see
            // https://webpack.github.io/docs/webpack-dev-middleware
        });
        const hotMiddlewares = bundler
            .compilers
            .filter(compiler => compiler.options.target !== 'node')
            .map(compiler => webpackHotMiddleware(compiler));

        let handleServerBundleComplete = () => {
            runServer((err, host) => {
                if (!err) {
                    const
                        bs = Browsersync.create(),
                        devOptions = {
                            port: 5000,
                            ui: { port: 5001 }
                        },
                        prodOptions = {
                            port: 5000,
                            notify: false,
                            ui: false
                        };

                    bs.init({
                        ...(DEBUG ? devOptions : prodOptions),
                        proxy: {
                            target: host,
                            middleware: [wpMiddleware, ...hotMiddlewares]
                        },

                        // no need to watch '*.js' here, webpack will take care of it for us,
                        // including full page reloads if HMR won't work
                        files: ['build/content/**/*.*']
                    }, resolve);
                    handleServerBundleComplete = runServer;
                }
            });
        };

        bundler.plugin('done', () => handleServerBundleComplete());
    });
}

export default start;
