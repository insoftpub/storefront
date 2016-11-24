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
import { map, isArray, isEmpty } from 'lodash';
import s from './ErrorField.scss';
import cx from 'classnames';

@withStyles(s)
class ErrorField extends Component {
    static propTypes = {
        className: pt.string,
        errors: pt.oneOfType([
            pt.array,
            pt.string
        ])
    };

    static defaultProps = {
        errors: []
    };

    render() {
        let { errors } = this.props;

        if (!errors || isEmpty(errors)) {
            return null;
        }

        if (!isArray(errors)) {
            errors = [errors];
        }

        return (
            <div className={cx(s.root, this.props.className)}>
                {map(errors, (error, key) =>
                    <span
                        key={'error-' + key}
                        className={s.errorText}
                    >
                        {error}
                    </span>
                )}
            </div>
        );
    }
}

export default ErrorField;
