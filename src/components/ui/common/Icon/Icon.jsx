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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Icon.scss';
import cx from 'classnames';
import {
    SIZE_MEDIUM as DEFAULT_SIZE,
    THICKNESS_THIN as DEFAULT_THICKNESS
} from '../../../../constants/icon';
import { COLOR_BLACK as DEFAULT_COLOR } from '../../../../constants/colors';

@withStyles(s)
class Icon extends Component {
    static propTypes = {
        thickness: pt.number,
        color: pt.string,
        size: pt.shape({
            width: pt.number,
            height: pt.number
        }),
        viewBox: pt.shape({
            x: pt.number,
            y: pt.number,
            width: pt.number,
            height: pt.number
        }),
        children: pt.oneOfType([
            pt.array, pt.object
        ]),
        disabled: pt.bool,
        onClick: pt.func,
        href: pt.string
    };

    static defaultProps = {
        thickness: DEFAULT_THICKNESS,
        color: DEFAULT_COLOR,
        size: DEFAULT_SIZE,
        children: [],
        disabled: false,
        href: ''
    };

    handleClick = event => {
        if (!this.props.disabled) {
            this.props.onClick && this.props.onClick(event, this.props.href);
        }
    };

    render() {
        const
            { x, y, width, height } = this.props.viewBox,
            { thickness, className, ...props } = this.props;

        return (
            <svg
                {...props}
                className={cx(className, {
                    [s.clickable]: !!this.props.onClick
                })}
                onClick={this.handleClick}
                viewBox={`${x} ${y} ${width} ${height}`}
                style={{
                    enableBackground: `new ${x} ${y} ${width} ${height}`,
                    width: this.props.size.width,
                    height: this.props.size.height
                }}
            >
                <g stroke={this.props.color} fill={this.props.color} strokeWidth={thickness}>
                    {this.props.children}
                </g>
            </svg>
        );
    }
}

export default Icon;
