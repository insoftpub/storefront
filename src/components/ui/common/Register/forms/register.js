import React from 'react';
import { isEmpty } from 'lodash';
import Button from '../../Button';

export default component => {
    const { errors } = component.state;

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
        name: 'error_message',
        type: 'error',
        errors,
        noMargin: isEmpty(errors)
    }, {
        name: 'terms',
        type: 'title',
        subtext: '* By continuing this process, you agree to these terms and conditions',
        noMargin: true
    }, {
        name: 'register',
        type: 'component',
        component: (
            <Button isSubmit wide>
                Create account
            </Button>
        )
    }];
};
