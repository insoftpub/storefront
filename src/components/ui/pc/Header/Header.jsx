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
import s from './Header.scss';
import cx from 'classnames';
import Link from '../../common/Link';
import AccountLink from '../../common/AccountLink';
import Container from '../../common/Container';
import Navigation from '../Navigation';
import CartPreview from '../../common/CartPreview';

@withStyles(s)
class Header extends Component {
    static contextTypes = {
        executeAction: pt.func.isRequired
    };

    render() {
        return (
            <div className={s.root}>
                <Container>
                    <div className={cx(s.row, s.spaceBetween, s.center, s.high)}>
                        <div className={cx(s.row, s.equal, s.contentLeft)}>
                            <Navigation />
                        </div>
                        <div className={cx(s.logo, s.equal, s.contentCentered)}>
                            <Link name='{logo}' to='/' className={s.logo} />
                        </div>
                        <div className={cx(s.row, s.equal, s.contentRight)}>
                            <div className={s.pad}>
                                <AccountLink className={s.link} />
                            </div>
                            <div className={s.pad}>
                                <CartPreview className={s.link} />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

}

export default Header;
