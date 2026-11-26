import * as dateFn from "date-fns";

function getThreeDaysFromNow() {
  const auxDate = dateFn.addDays(new Date(), 3);

  return {
    year: auxDate.getUTCFullYear(),
    month: auxDate.getUTCMonth(),
    day: auxDate.getUTCDate(),
  };
}

function getRemainingDays(dueDate) {
  const auxDueDate = new Date(dueDate);
  const auxToday = new Date();

  const dueUTCDate = Date.UTC(
    auxDueDate.getUTCFullYear(),
    auxDueDate.getUTCMonth(),
    auxDueDate.getUTCDate(),
  );
  const todayDate = Date.UTC(
    auxToday.getFullYear(),
    auxToday.getMonth(),
    auxToday.getDate(),
  );
  return dateFn.differenceInDays(dueUTCDate, todayDate);
}

function formatRemainingDays(remainingDays) {
  if (remainingDays < 0 && remainingDays !== -1) {
    return `${remainingDays * -1} days late`;
  }

  if (remainingDays === -1) {
    return `Yesterday`;
  }

  if (remainingDays === 1) {
    return "Tomorrow";
  }

  if (remainingDays === 0) {
    return "Today";
  }

  return `${remainingDays} days remaining`;
}

function checkDate(year, month, day) {
  return dateFn.isExists(year, month, day);
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

  if (
    ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) &&
    month === 2
  ) {
    return (maxDay = 29);
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

export {
  getThreeDaysFromNow,
  getCurrentMonth,
  getCurrentYear,
  checkMonth,
  getMaxDay,
  checkDate,
  getRemainingDays,
  formatRemainingDays,
};
