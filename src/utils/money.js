import { CURRENCY_SIGN } from '../constants/currencies';
import { formatAmount } from './amount';

export function formatPrice(price, currency) {
    const
        formattedPrice = formatAmount(price),
        currencySymbol = getCurrencySymbol(currency);

    return `${formattedPrice} ${currencySymbol}`;
}

export function getCurrencySymbol(abbreviation) {
    return CURRENCY_SIGN[abbreviation];
}

export function calculatePrice(initialPrice, discount) {
    return initialPrice * (1 - discount);
}
