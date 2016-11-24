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
import s from './TextArea.scss';
import cx from 'classnames';

@withStyles(s)
class TextArea extends Component {
    static propTypes = {
        onChange: pt.func,
        title: pt.string,
        placeholder: pt.string,
        showLabel: pt.bool,
        className: pt.string,
        wrapperClassName: pt.string,
        wide: pt.bool,
        frame: pt.bool,
        textAlign: pt.oneOf([
            'left',
            'center',
            'right'
        ]),
        required: pt.bool,
        invalid: pt.bool,
        error: pt.string,
        type: pt.string,
        height: pt.number,
        labelPosition: pt.oneOf([
            'left',
            'top',
            'right'
        ])
    };

    static defaultProps = {
        showLabel: false,
        wide: false,
        frame: true,
        textAlign: 'left',
        required: false,
        invalid: false,
        type: 'text',
        height: 100,
        labelPosition: 'top'
    };

    handleChange = (event) => {
        const value = event.target && event.target.value;

        this.props.onChange && this.props.onChange(value);
    };

    render() {
        const { wrapperClassName, labelPosition, showLabel,
            textAlign, height, className, frame, invalid,
            placeholder, title, required, wide } = this.props;

        return (
            <div
                className={cx(s.root, wrapperClassName, {
                    [s.wide]: wide,
                    [s.leftLabelPosition]: labelPosition === 'left',
                    [s.rightLabelPosition]: labelPosition === 'right'
                })}
            >
                {
                    showLabel && <label className={cx(s.label, {
                        [s.hasOffset]: labelPosition !== 'top'
                    })}
                    >
                        {title}
                        {required && <span>&nbsp;*</span>}
                    </label>
                }
                <div className={s.controls}>
                    <textarea
                        style={{
                            textAlign,
                            minHeight: height + 'px'
                        }}
                        className={cx(s.input, className, {
                            [s.blackFrame]: frame && !invalid,
                            [s.redFrame]: frame && invalid
                        })}
                        placeholder={placeholder || (showLabel ? '' : title)}
                        onChange={this.handleChange}
                        rows='5'
                    />
                    <div className={cx(s.message, {
                        [s.error]: invalid
                    })}
                    >
                        {this.props.error}
                    </div>
                </div>
            </div>
        );
    }
}

export default TextArea;
