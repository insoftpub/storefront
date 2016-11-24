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
