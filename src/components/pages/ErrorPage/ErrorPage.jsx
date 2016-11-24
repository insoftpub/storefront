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

import React, { Component, PropTypes } from 'react';
import Link from '../../ui/common/Link';
import { mail } from '../../../config';
import IconEdit from '../../ui/common/Icon/Icons/Edit.jsx';
import { SIZE_SMALL, THICKNESS_NORMAL } from '../../../constants/icon';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ErrorPage.scss';

const title = 'Error';

@withStyles(s)
class ErrorPage extends Component {
    static pageName = 'error';

    static contextTypes = {
        setTitle: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.context.setTitle(title);
    }

    render() {
        return (
            <div className={s.wrapper}>
                <h1>DOWN FOR MAINTENANCE</h1>
                <p>Store is down for maintenance</p>
                <p>and will be back shortly.</p>
                <p>Please, visit us later.</p>
                <p>Thank you!</p>
                <p className={s.linksWrapper}>
                    <Link
                        to={`mailto:${mail}`}
                        key={'CONTACT US'}
                        className={s.link}
                        wrapperClassName={s.linkWrapper}
                    >
                        <span className={s.linkIconWrapper}>
                            <IconEdit
                                className={s.linkIcon}
                                size={SIZE_SMALL}
                                thickness={THICKNESS_NORMAL}
                                color='#888'
                            />
                        </span>
                        <span>CONTACT US</span>
                    </Link>
                </p>
            </div>
        );
    }

}

export default ErrorPage;
