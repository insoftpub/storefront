import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NewPassword.scss';
import Form from '../Form';
import getFormItems from './forms/newPassword';
import { routes } from '../../../../config';

@withStyles(s)
class NewPassword extends Component {
    static contextTypes = {
        getUserAgent: pt.func.isRequired,
        executeAction: pt.func.isRequired
    };

    static propTypes = {
        account: pt.object
    };

    componentDidMount() {
        this.context.executeAction('user/update', { id: this.props.account.id, $unset: 'password_reset_code' });
    }

    handleSubmit = ({ newPassword }) => {
        this.context.executeAction('user/update', {
            id: this.props.account.id,
            password: newPassword
        })
            .then(() => this.context.executeAction('navigate/to', { url: routes.HOME }));
    };

    render() {
        return (
            <Form
                className={s.root}
                items={getFormItems()}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

export default NewPassword;
