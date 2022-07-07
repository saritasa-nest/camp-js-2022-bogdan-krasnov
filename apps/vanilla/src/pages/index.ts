import Table from './table';

window.addEventListener('DOMContentLoaded', () => {
  tableAnime();
});

/**
 * New table return function.
 * @returns Table.
 */
function tableAnime(): Table {
  return new Table();
}
