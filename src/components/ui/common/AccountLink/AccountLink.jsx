import React, { Component, PropTypes as pt } from 'react';
import watchStores from '../../../../utils/decorators/watchStores';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AccountLink.scss';
import Link from '../Link';
import { routes } from '../../../../config';

@withStyles(s)
@watchStores(
    'user'
)
class AccountLink extends Component {
    static contextTypes = {
        getStore: pt.func.isRequired
    };

    getStoresState() {
        const { user, isLogged } = this.context.getStore('user').getState();

        return { user, isLogged };
    }

    render() {
        return this.state.isLogged
            ? <Link {...this.props} to={routes.PROFILE} name='my account' />
            : <Link {...this.props} to={routes.LOGIN} name='login' />;
    }
}

export default AccountLink;
