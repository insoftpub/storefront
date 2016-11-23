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
