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
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ToggleButton.scss';

@withStyles(s)
class ToggleButton extends Component {
    static propTypes = {
        onChange: pt.func,
        title: pt.string,
        checked: pt.bool,
        className: pt.string,
        labelClassName: pt.string,
        name: pt.string
    };

    static defaultProps = {
        showLabel: false,
        checked: false
    };

    constructor(props) {
        super(props);

        this.state = {
            checked: props.checked
        };
    }

    componentWillReceiveProps(nextProps) {
        const { checked } = this.state;

        if (checked !== nextProps.checked) {
            this.setState({ checked: nextProps.checked });
        }
    }

    handleChange = () => {
        const
            checked = !this.state.checked,
            { title, name } = this.props;

        this.setState({ checked });
        this.props.onChange && this.props.onChange({ checked, title, id: name });
    };

    render() {
        return (
            <div
                onClick={this.handleChange}
                className={cx(s.root, this.props.className)}
            >
                <div
                    className={cx(s.inner, this.props.labelClassName, {
                        [s.checked]: this.state.checked
                    })}
                >
                    {this.props.title}
                </div>
            </div>
        );
    }
}

export default ToggleButton;
