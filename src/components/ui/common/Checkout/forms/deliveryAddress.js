import { deliveryRegions } from '../../../../../config';
import { isEmpty } from 'lodash';

const
    regions = deliveryRegions.map(item => ({
        name: item,
        key: item,
        selectable: true
    }));

export default component => {
    const { user, orderErrors: errors, isLogged } = component.state;

    return [{
        name: 'error_message',
        type: 'error',
        errors,
        noMargin: isEmpty(errors)
    }, {
        name: 'first_name',
        title: 'Name',
        validators: {
            required: true
        },
        value: user['first_name']
    }, {
        name: 'phone',
        title: 'Phone',
        validators: {
            required: true
        },
        value: user['phone']
    }, {
        name: 'email',
        type: 'email',
        title: 'E-mail',
        disabled: isLogged,
        validators: {
            required: true
        },
        value: user['email']
    }, {
        name: 'password',
        type: 'password',
        title: 'Password',
        hidden: isLogged,
        validators: {
            required: true
        }
    }, {
        name: 'address1',
        title: 'Address',
        validators: {
            required: true
        },
        value: user['shipping']['address1']
    }, {
        name: 'state',
        type: 'select',
        title: 'Region',
        options: regions,
        defaultValue: 'region1',
        value: user['shipping']['state']
    }, {
        name: 'city',
        title: 'City',
        value: user['shipping']['city']
    }, {
        name: 'comments',
        title: 'Comments',
        type: 'textarea'
    }];
};
