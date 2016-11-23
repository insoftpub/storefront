export function arrangeBrandsByAlphabet(data) {
    const map = {};

    data = data.sort((a, b) => {
        const
            first = a.name.toUpperCase(),
            second = b.name.toUpperCase();

        if (first > second) {
            return 1;
        }
        if (first < second) {
            return -1;
        }

        return 0;
    });

    for (let i in data) {
        const firstLetter = data[i].name.charAt(0);

        map[firstLetter] === undefined ? map[firstLetter] = [data[i]] : map[firstLetter].push(data[i]);
    }

    return map;
}
