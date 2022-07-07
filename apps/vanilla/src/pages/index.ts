import Table from './table';

window.addEventListener('DOMContentLoaded', () => {
  renderTableAnime();
});

/**
 * New table return function.
 * @returns Table.
 */
function renderTableAnime(): Table {
  return new Table();
}
