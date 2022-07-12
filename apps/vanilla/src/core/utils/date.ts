/**
 * Converting data to date format.
 * @param dateReceived Data coming from the server .
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
