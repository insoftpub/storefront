const
    COUNT_OF_DIGITS = 8,
    FACTOR = 10;

export function generateOrderNumber() {
    let result = 'K';

    for (let i = 0; i < COUNT_OF_DIGITS; i++) {
        result += Math.floor(Math.random() * FACTOR).toString();
    }

    return result;
}
