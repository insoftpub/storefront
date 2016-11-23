export function formatAmount(amount) {
    const
        string = `${amount}`,
        triads = [];

    for (let i = string.length - 1; i >= 0; i -= 3) {
        if (i > 2) {
            triads.push(string.substr(i - 2, 3));
        } else {
            triads.push(string.substr(0, i + 1));
        }
    }

    let result = `${triads[triads.length - 1]}`;

    for (let i = triads.length - 2; i > -1; i--) {
        result += ` ${triads[i]}`;
    }

    return result;
}
