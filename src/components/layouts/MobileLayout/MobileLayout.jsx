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
import Header from '../../ui/mobile/Header';
import Progress from '../../ui/common/Progress';
import s from './MobileLayout.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Mask from '../../ui/common/Mask';
import Navigation from '../../ui/mobile/Navigation';
import cx from 'classnames';
import Slide from '../../ui/common/Slide';

const
    MASK_OPACITY = 0.2,
    FULL_SCREEN_WIDTH = '-100vw';

@withStyles(s)
class MobileLayout extends Component {
    static contextTypes = {
        getCookie: pt.func.isRequired,
        setCookie: pt.func.isRequired
    };

    static propTypes = {
        hasFooter: pt.bool,
        showProgress: pt.bool,
        showBackIcon: pt.bool,
        children: pt.node
    };

    static defaultProps = {
        hasFooter: true,
        showProgress: false,
        showBackIcon: false
    };


    state = {
        menuShowed: false
    };

    handleMenuClick = () => {
        this.showMenu();
    };

    handleNavigationClick = () => {
        this.hideMenu();
    };

    showMenu() {
        this.setState({ menuShowed: true });
        this.disableBodyScroll();
    }

    hideMenu() {
        this.setState({ menuShowed: false });
        this.enableBodyScroll();
    }

    disableBodyScroll() {
        let [body] = document.getElementsByTagName('body');

        body.setAttribute('style', 'overflow: hidden;');
    }

    enableBodyScroll() {
        let [body] = document.getElementsByTagName('body');

        body.setAttribute('style', 'overflow: initial;');
    }

    render() {
        const
            { menuShowed } = this.state;

        return (
            <div className={s.root}>
                {this.props.showProgress && <Progress />}
                <Mask
                    className={s.mask}
                    visible={menuShowed}
                    opacity={MASK_OPACITY}
                />
                <Header
                    className={cx(s.header, s.fixed)}
                    showBackIcon={this.props.showBackIcon}
                    onMenuClick={this.handleMenuClick}
                />
                <Slide
                    className={s.slider}
                    visible={menuShowed}
                    direction='left'
                    start={FULL_SCREEN_WIDTH}
                    end='0'
                >
                    <Navigation
                        className={s.navigation}
                        onClick={this.handleNavigationClick}
                    />
                </Slide>
                <div className={cx(s.content, s.hasTopPadding)}>
                    {this.props.children}
                </div>

            </div>
        );
    }
}

export default MobileLayout;
