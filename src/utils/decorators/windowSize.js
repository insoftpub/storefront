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

import React, { Component, PropTypes as pt } from 'react';
import _ from 'lodash';
import hoistStatics from 'hoist-non-react-statics';

var handlers = [];

const
    MIN_SIZE = 300,
    size = {
        windowWidth: 0,
        windowHeight: 0
    },
    update = () => handlers.forEach(handler => handler(size)),
    setSize = _.debounce((width, height) => {
        size.windowWidth = width;
        size.windowHeight = height;
        update();
    }, MIN_SIZE),
    initListener = _.once(() => {
        setSize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', () => {
            setSize(window.innerWidth, window.innerHeight);
        });
    }),
    windowSize = WrappedComponent => {
        class WindowSize extends Component {
            static displayName = `WindowSize(${WrappedComponent.displayName || WrappedComponent.name})`;

            static propTypes = {
                children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)])
            };

            componentDidMount() {
                handlers.push(this.hanldePositionChange);
                initListener();
            }

            componentWillUnmount() {
                handlers = handlers.filter(handler => handler !== this.hanldePositionChange);
            }

            hanldePositionChange = size => this.setState(size);

            render() {
                const { children, ...rest } = this.props;

                return (
                    <WrappedComponent {...rest} {...this.state}>
                        {children}
                    </WrappedComponent>
                );
            }
        }

        return hoistStatics(WindowSize, WrappedComponent);
    };

export default windowSize;
