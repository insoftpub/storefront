export default () => {
    return [{
        name: 'paymentMethod',
        type: 'radioGroup',
        defaultActiveIndex: 0,
        items: [{
            name: 'cashOrCreditCard',
            title: 'Cash or credit card on delivery'
        }]
    }];
};
