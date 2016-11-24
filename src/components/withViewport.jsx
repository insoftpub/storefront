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

import React, { Component } from 'react';
import EventEmitter from 'eventemitter3';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

let EE,
    viewport = { width: 1366, height: 768 }; // Default size for server-side rendering
const RESIZE_EVENT = 'resize';

function handleWindowResize() {
    if (viewport.width !== window.innerWidth || viewport.height !== window.innerHeight) {
        viewport = { width: window.innerWidth, height: window.innerHeight };
        EE.emit(RESIZE_EVENT, viewport);
    }
}

function withViewport(ComposedComponent) {
    return class WithViewport extends Component {
        constructor() {
            super();

            this.state = {
                viewport: canUseDOM ? { width: window.innerWidth, height: window.innerHeight } : viewport
            };
        }

        componentDidMount() {
            if (!EE) {
                EE = new EventEmitter();
                window.addEventListener('resize', handleWindowResize);
                window.addEventListener('orientationchange', handleWindowResize);
            }

            EE.on(RESIZE_EVENT, this.handleResize, this);
        }

        componentWillUnmount() {
            EE.removeListener(RESIZE_EVENT, this.handleResize, this);
            if (!EE.listeners(RESIZE_EVENT, true)) {
                window.removeEventListener('resize', handleWindowResize);
                window.removeEventListener('orientationchange', handleWindowResize);
                EE = null;
            }
        }

        render() {
            return <ComposedComponent {...this.props} viewport={this.state.viewport}/>;
        }

        handleResize(value) {
            this.setState({ viewport: value }); // eslint-disable-line react/no-set-state
        }
    };
}

export default withViewport;
