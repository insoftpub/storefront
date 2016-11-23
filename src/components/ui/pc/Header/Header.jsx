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
