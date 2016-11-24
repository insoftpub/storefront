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
import s from './Slide.scss';
import withStyles from '../../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

@withStyles(s)
class Slide extends Component {
    static propTypes = {
        className: pt.string,
        visible: pt.bool,
        direction: pt.oneOf([
            'top',
            'bottom',
            'left',
            'right'
        ]),
        start: pt.oneOfType([
            pt.string,
            pt.number
        ]),
        end: pt.oneOfType([
            pt.string,
            pt.number
        ]),
        children: pt.node
    };

    render() {
        const { className, visible, direction, start, end, ...props } = this.props;

        return (
            <div
                {...props}
                className={cx(s.root, className)}
                style={{
                    [direction]: visible ? end : start
                }}
            >
                {this.props.children}
            </div>
        );
    }
}

export default Slide;
