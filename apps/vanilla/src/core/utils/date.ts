/**
 * Converting data to string format.
 * @param date Date.
 */
export function formatDate(date: Date | null): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  if (date === null) {
    return 'No date';
  }
  return date.toLocaleString('ru', options);
}
