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
import s from './ForgottenPassword.scss';
import getFormItems from './forms/forgottenPassword';
import Form from '../Form';
import { generateSessionId } from '../../../../utils/session';

@withStyles(s)
class ForgottenPassword extends Component {
    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getUserAgent: PropTypes.func.isRequired
    };

    state = {
        error: ''
    };

    handleSubmit = ({ email }) => {
        this.context.executeAction('user/get', { email })
            .then(user => {
                if (!user) {
                    throw new Error('user not found');
                }

                const code = generateSessionId();

                this.context.executeAction('user/update', {
                    email,
                    password_reset_code: code
                });

                return this.context.executeAction('email/send', {
                    email,
                    type: 'resetPassword',
                    data: { code }
                });
            })
            .catch(error => this.setState({ error }));
    };

    renderError() {
        const { error } = this.state;

        if (error) {
            return <span className={s.error}>{error.toString()}</span>;
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className={s.root}>
                <Form
                    items={getFormItems()}
                    onSubmit={this.handleSubmit}
                />
                {this.renderError()}
            </div>
        );
    }
}

export default ForgottenPassword;
