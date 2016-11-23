import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';
import IconMenu from '../../common/Icon/Icons/Controls/Menu';
import IconBack from '../../common/Icon/Icons/Controls/LeftAngle';
import IconCart from '../../common/Icon/Icons/Cart';
import Link from '../../common/Link';
import { routes } from '../../../../config';
import { SIZE_SMALL } from '../../../../constants/icon';
import watchStores from '../../../../utils/decorators/watchStores';
import cx from 'classnames';
import { reduce } from 'lodash';

@withStyles(s)
@watchStores(
    'navigation',
    'cart'
)
class Header extends Component {
    static contextTypes = {
        executeAction: pt.func.isRequired,
        getStore: pt.func.isRequired
    };

    static propTypes = {
        className: pt.string,
        showBackIcon: pt.bool,
        onMenuClick: pt.func,
        id: pt.string
    };

    getStoresState() {
        const
            { backPath } = this.context.getStore('navigation').getState(),
            { products } = this.context.getStore('cart').getState(),
            productLength = reduce(products, (memo, { quantity }) => memo + quantity, 0);

        return {
            backPath,
            productLength
        };
    }

    handleMenuIconClick = event => {
        this.props.onMenuClick && this.props.onMenuClick(event);
    };

    renderMenuIcon() {
        return (
            <IconMenu
                className={s.hamburger}
                onClick={this.handleMenuIconClick}
                size={SIZE_SMALL}
            />
        );
    }

    renderBackIcon() {
        return (
            <Link
                custom
                className={s.hamburger}
                to={this.state.backPath}
            >
                <IconBack size={SIZE_SMALL} />
            </Link>
        );
    }

    render() {
        return (
            <div id={this.props.id} className={cx(s.root, this.props.className)}>
                <div className={s.leftIconsBlock}>
                    {this.props.showBackIcon ? this.renderBackIcon() : this.renderMenuIcon()}
                </div>
                <Link
                    name='{logo}'
                    className={s.brand}
                    to={routes.HOME}
                />
                <div className={s.rightIconsBlock}>
                    <Link
                        custom
                        className={s.cart}
                        to={routes.CART}
                    >
                        <IconCart size={SIZE_SMALL} />
                        <div className={s.productLength}>
                            {this.state.productLength}
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Header;
