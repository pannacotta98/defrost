const _MS_PER_DAY = 1000 * 60 * 60 * 24;

/** @deprecated */
export function dayDiff(a: Date, b: Date) {
  // https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

/** Validates dates in the format 'yyyy-mm-dd'
 * @deprecated
 */
export function isValidDate(dateString: string) {
  // https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript

  // First check for the pattern
  var regexDate = /^\d{4}-\d{1,2}-\d{1,2}$/;

  if (!regexDate.test(dateString)) {
    return false;
  }

  // Parse the date parts to integers
  var parts = dateString.split('-');
  var day = parseInt(parts[2], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[0], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month === 0 || month > 12) {
    return false;
  }

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29;
  }

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}

/** @deprecated */
export function dateToYMD(date: Date) {
  // https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
