/**
 * Converting data to string format.
 * @param dateReceived Data in date format.
 */
export function formatDate(dateReceived: Date): string {
  const date = new Date(dateReceived);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return date.toLocaleString('ru', options);
}
