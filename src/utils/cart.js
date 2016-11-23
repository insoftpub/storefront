import { endsWith } from 'lodash';

export function getProductsAmountText(amount) {
    return amount > 1
        ? `${amount} products`
        : `${amount} product`;
}
