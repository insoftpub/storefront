import moment from 'moment';

export function showNewSeasonLabel(season) {
    const
        currentDate = moment(),
        currentYear = Number(currentDate.format('YY')),
        currentMonth = currentDate.month() + 1,
        seasonShort = season.substring(0, 2), // AW or SS
        yearLastNumbers = Number(season.substring(2)),
        // prevYearFor 00 is 99
        prevYearLastNumbers = (yearLastNumbers + 99) % 100; // eslint-disable-line no-magic-numbers

    // Spring Summer and 3, 4, 5, 6, 7, 8 months
    if (seasonShort === 'SS') {
        return (yearLastNumbers === currentYear && currentMonth > 2 && currentMonth <= 8); // eslint-disable-line no-magic-numbers
    }

    // Autumn Winter and 9, 10, 11, 12, 1, 2 months
    if (seasonShort === 'AW') {
        return (currentYear === prevYearLastNumbers && currentMonth > 8) // eslint-disable-line no-magic-numbers
            || (currentYear === yearLastNumbers && currentMonth <= 2);
    }
}
