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

    constructor(props) {
        super(props);

        this.state = {
            error: ''
        };
    }

    handleSubmit = ({ email }) => {
        this.context.executeAction('user/find', { email })
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
