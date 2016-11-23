import React from 'react';
import Button from '../../Button';

export default isDesktop => [{
    name: 'email',
    title: 'E-mail',
    showLabel: isDesktop,
    required: isDesktop
}, {
    name: 'login',
    type: 'component',
    component: (
        <Button isSubmit wide>
            Retrieve password
        </Button>
    )
}];
