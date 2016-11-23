import React from 'react';
import Button from '../../Button';

export default isDesktop => [{
    type: 'password',
    name: 'newPassword',
    title: 'New Password',
    showLabel: isDesktop
}, {
    name: 'submit',
    type: 'component',
    component: (
        <Button isSubmit>
            reset password
        </Button>
    )
}];
