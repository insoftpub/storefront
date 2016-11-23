import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.scss';
import Form from '../Form';
import Button from '../Button';
import Separator from '../Separator';
import IconFacebook from '../Icon/Icons/SocialNetworks/Facebook.jsx';
import getLoginItems from './forms/login';
import { routes } from '../../../../config';
import { SIZE_EXTRA_SMALL } from '../../../../constants/icon';
import { COLOR_WHITE, COLOR_BLUE } from '../../../../constants/colors';

@withStyles(s)
class Login extends Component {
    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getUserAgent: PropTypes.func.isRequired
    };

    state = {
        errors: null
    };

    handleFacebookAuthClick = () => {
        this.context.executeAction('navigate/to', { url: routes.FACEBOOK_AUTH, reload: true });
    };

    handleSubmit = data => {
        this.context.executeAction('user/login', data)
            .then(() => this.context.executeAction('navigate/to', { url: routes.PROFILE }))
            .catch(error => this.setState({ errors: error.message }));
    };

    render() {
        const { isDesktop } = this.context.getUserAgent();

        return (
            <div className={s.wrapper}>
                <div className={s.thirdPartyAuth}>
                    <Button
                        frame={false}
                        color={COLOR_BLUE}
                        onClick={this.handleFacebookAuthClick}
                    >
                        <IconFacebook
                            color={COLOR_WHITE}
                            size={SIZE_EXTRA_SMALL}
                        />
                        &nbsp;
                        Sign in
                    </Button>
                    <p>We wont' publish anything<br />on your behalf</p>
                    <p>
                        <span className={s.or}>or</span>
                        <Separator className={s.separator} />
                    </p>
                </div>
                <Form
                    items={getLoginItems(this, s)}
                    onSubmit={this.handleSubmit}
                    errors={this.state.errors}
                    showLabels={isDesktop}
                />
            </div>
        );
    }
}

export default Login;
