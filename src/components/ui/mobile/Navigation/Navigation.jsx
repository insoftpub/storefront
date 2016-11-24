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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.scss';
import cx from 'classnames';
import Link from '../../common/Link';
import { SIZE_SMALL } from '../../../../constants/icon';
import { isEmpty } from 'lodash';
import CollapsibleLink from '../../common/CollapsibleLink';
import IconClose from '../../common/Icon/Icons/Controls/Close.jsx';
import watchStores from '../../../../utils/decorators/watchStores';
import { routes } from '../../../../config';

@withStyles(s)
@watchStores(
    'user',
    'navigation'
)
class Navigation extends Component {
    static contextTypes = {
        getStore: PropTypes.func.isRequired,
        executeAction: PropTypes.func.isRequired
    };

    static propTypes = {
        style: PropTypes.object,
        onClick: PropTypes.func
    };

    static defaultProps = {
        style: {}
    };

    getStoresState() {
        const
            { navigation } = this.context.getStore('navigation').getState(),
            { isLogged } = this.context.getStore('user').getState();

        return { navigation, isLogged };
    }

    handleLinkClick = () => {
        this.props.onClick && this.props.onClick();
    };

    renderLinks() {
        const links = this.state.navigation.map((link, index) => (
            isEmpty(link.links)
            ? <Link
                to={link.to}
                name={link.name}
                key={link.name}
                links={link.links}
                onClick={this.handleLinkClick}
                className={s.link}
                wrapperClassName={s.linkWrapper}
            />
            : <CollapsibleLink
                {...link}
                to={link.to}
                name={link.name}
                key={link.name}
                links={link.links}
                onClick={this.handleLinkClick}
                className={s.link}
            />
        ));

        return [...links, <Link
            key='login'
            name={this.state.isLogged ? 'account' : 'login'}
            className={s.link}
            wrapperClassName={s.linkWrapper}
            to={this.state.isLogged ? routes.PROFILE : routes.LOGIN}
            onClick={this.handleLinkClick}
        />];
    }

    render() {
        const { className } = this.props;

        return (
            <div
                className={cx(className, s.root)}
                style={this.props.style}
            >
                <IconClose
                    size={SIZE_SMALL}
                    className={s.close}
                    onClick={this.handleLinkClick}
                />
                <div className={s.inner}>
                    <div className={cx(s.links, s.row)}>
                        {this.renderLinks()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;
