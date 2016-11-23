import errorMessages from '../constants/errorMessages';

const validators = {
    required: (title, value) => value.length > 0 ? true : errorMessages['required'](title)
};

export default validators;
