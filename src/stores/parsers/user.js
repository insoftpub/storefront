function parseUser(data = {}) {
    const defaultValues = {
        first_name: '',
        phone: '',
        email: '',
        shipping: {
            address1: '',
            address2: '',
            state: '',
            city: ''
        }
    };

    return {
        ...defaultValues,
        ...data
    };
}

export {
    parseUser
};
