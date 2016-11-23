import React from 'react';
import Button from '../../Button';
import { deliveryRegions } from '../../../../../config';
import { COLOR_WHITE } from '../../../../../constants/colors';

const
    regions = deliveryRegions.map(item => ({
        name: item,
        selectable: true
    }));

export default (component, s) => {
    const { user } = component.state;

    return [{
        name: 'first_name',
        title: 'Name',
        value: user['first_name']
    }, {
        name: 'phone',
        title: 'Phone №',
        value: user['phone']
    }, {
        name: 'email',
        type: 'email',
        title: 'E-mail',
        value: user['email'],
        nonEditable: true
    }, {
        name: 'shipping.address1',
        title: 'Address',
        value: user['shipping']['address1']
    }, {
        name: 'shipping.state',
        type: 'select',
        title: 'Region',
        options: regions,
        defaultValue: 'region1',
        value: user['shipping']['state']
    }, {
        name: 'shipping.city',
        title: 'City',
        value: user['shipping']['city']
    }, {
        name: 'edit',
        type: 'component',
        component: (
            <div className={s.buttons}>
                <Button isSubmit className={s.editButton}>
                    {component.state.isEditMode ? 'Save' : 'Edit'}
                </Button>
                <Button color={COLOR_WHITE} onClick={component.handleCancelClick}>
                    Cancel
                </Button>
            </div>
        )
    }];
};
