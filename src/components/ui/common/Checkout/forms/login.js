import React from 'react';
import { isEmpty } from 'lodash';
import Button from '../../Button';
import Link from '../../Link';
import { routes } from '../../../../../config';

export default (component, s) => {
    const { loginErrors: errors } = component.state;

    return [{
        name: 'email',
        type: 'email',
        title: 'E-mail',
        validators: {
            required: true
        }
    }, {
        name: 'password',
        type: 'password',
        title: 'Password',
        validators: {
            required: true
        }
    }, {
        name: 'errorMessage',
        type: 'error',
        errors,
        noMargin: isEmpty(errors)
    }, {
        name: 'forgottenLink',
        type: 'component',
        component: (
            <Link
                underlined
                to={routes.FORGOTTEN_PASSWORD}
                name='Forgot you password?'
            />
        )
    }, {
        name: 'addToCart',
        type: 'component',
        component: (
            <Button isSubmit>
                Sign in
            </Button>
        )
    }];
};
