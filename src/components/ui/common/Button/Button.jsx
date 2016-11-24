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
import s from './Button.scss';
import cx from 'classnames';
import { COLOR_BLACK, COLOR_WHITE, COLOR_BLUE } from '../../../../constants/colors';

@withStyles(s)
class Button extends Component {
    static contextTypes = {
        executeAction: pt.func.isRequired
    };

    static propTypes = {
        onClick: pt.func,
        wide: pt.bool,
        to: pt.string,
        frame: pt.bool,
        color: pt.oneOf([
            COLOR_WHITE,
            COLOR_BLACK,
            COLOR_BLUE
        ]),
        icon: pt.element,
        disabled: pt.bool,
        form: pt.string,
        className: pt.string,
        isSubmit: pt.bool,
        children: pt.node
    };

    static defaultProps = {
        wide: false,
        frame: true,
        color: COLOR_BLACK,
        disabled: false,
        isSubmit: false
    };

    handleClick = event => {
        if (this.props.to) {
            event.preventDefault();

            this.context.executeAction('navigate/to', {
                url: this.props.to
            });
        }

        this.props.onClick && this.props.onClick(event);
    };

    renderIcon() {
        return (
            <span className={s.icon}>
                {this.props.icon}
            </span>
        );
    }

    render() {
        return (
            <button
                type={this.props.isSubmit ? 'submit' : 'button'}
                form={this.props.form}
                onClick={this.handleClick}
                className={cx(this.props.className, s.root, {
                    [s.black]: this.props.color === COLOR_BLACK,
                    [s.white]: this.props.color === COLOR_WHITE,
                    [s.blue]: this.props.color === COLOR_BLUE,
                    [s.frame]: this.props.frame,
                    [s.wide]: this.props.wide,
                    [s.disabled]: this.props.disabled
                })}
                disabled={this.props.disabled}
            >
                <span className={s.text}>
                    {this.props.children}
                </span>
                {this.props.icon && this.renderIcon()}
            </button>
        );
    }
}

export default Button;
