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
import s from './Register.scss';
import Form from '../Form';
import { routes } from '../../../../config';
import getRegisterItems from './forms/register';

@withStyles(s)
class Register extends Component {
    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getUserAgent: PropTypes.func.isRequired
    };

    state = {
        errors: null
    };

    handleSubmit = values => {
        this.setState({ loading: true });

        this.context.executeAction('user/register', values)
            .then(user => {
                this.context.executeAction('email/send', {
                    email: user.email,
                    type: 'registration',
                    data: {
                        name: user.name
                    }
                });

                return this.context.executeAction('navigate/to', { url: routes.PROFILE });
            })
            .catch(error => this.setState({ errors: error.details.email }));
    };

    render() {
        const { isDesktop } = this.context.getUserAgent();

        return (
            <div className={s.root}>
                <Form
                    items={getRegisterItems(this)}
                    onSubmit={this.handleSubmit}
                    loading={this.state.loading}
                    showLabels={isDesktop}
                />
            </div>
        );
    }
}

export default Register;
