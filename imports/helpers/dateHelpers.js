export function getDateFrom(date) {
  if (!date) {
    return '';
  }

  return `${date.getDate().toString().padStart(2, '0')}/${date
    .getMonth()
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`;
}

export function getTimeFrom(date) {
  if (!date) {
    return '';
  }
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
}

export function getDateTimeFrom(date) {
  if (!date) {
    return '';
  }

  console.log(`inside getDateTimeFrom : ${date}`);
  return `${getDateFrom(date)} - ${getTimeFrom(date)}`;
}
