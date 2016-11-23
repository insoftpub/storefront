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
