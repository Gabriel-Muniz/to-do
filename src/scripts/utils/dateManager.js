import * as dateFn from "date-fns";

function getThreeDaysFromNow() {
    return new Date().getUTCDate() + 3;
}

function getCurrentYear() {
    return new Date().getUTCFullYear();
}

function getCurrentMonth() {
    return new Date().getUTCMonth() + 1;
}

function checkMonth(month) {
    return month >= 1 && month <= 12;
}

function getMaxDay(month, year) {
    month = Number(month);
    year = Number(year);
    let maxDay;

    if (((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) && month === 2) {
        return maxDay = 29;
    }

    switch (month) {
        case 2:
            maxDay = 28;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            maxDay = 30;
            break;
        default:
            maxDay = 31;
            break;
    }

    return maxDay;
}

export { getThreeDaysFromNow, getCurrentMonth, getCurrentYear, checkMonth, getMaxDay }