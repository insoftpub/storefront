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
import { routes, mail } from '../../../config';
import IconHome from '../../ui/common/Icon/Icons/Home.jsx';
import IconEdit from '../../ui/common/Icon/Icons/Edit.jsx';
import { SIZE_SMALL, THICKNESS_NORMAL } from '../../../constants/icon';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotFoundPage.scss';

const title = 'Page Not Found';

@withStyles(s)
class NotFoundPage extends Component {
    static pageName = 'notFound';

    static contextTypes = {
        setTitle: PropTypes.func.isRequired,
        onPageNotFound: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.context.setTitle(title);
        this.context.onPageNotFound();
    }

    renderLinks() {
        return [
            <Link
                to={routes.HOME}
                key={'HOME'}
                className={s.link}
                wrapperClassName={s.linkWrapper}
            >
                <span className={s.linkIconWrapper}>
                    <IconHome
                        className={s.linkIcon}
                        size={SIZE_SMALL}
                        thickness={THICKNESS_NORMAL}
                        color='#888'
                    />
                </span>
                <span>HOME</span>
            </Link>,
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
        ];
    }

    render() {
        return (
            <div className={s.wrapper}>
                <h1>ERROR 404</h1>
                <h2>PAGE NOT FOUND</h2>
                <p>Sorry, but the page</p>
                <p>you were trying to view</p>
                <p>does not exist.</p>
                <p className={s.linksWrapper}>{this.renderLinks()}</p>
            </div>
        );
    }

}

export default NotFoundPage;
