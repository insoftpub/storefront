export function userErrorsParser(error) {
    switch (error.code) {
    case 'UNIQUE':
        return 'Данный email уже используется';
    default:
        return error.message;
    }
}
