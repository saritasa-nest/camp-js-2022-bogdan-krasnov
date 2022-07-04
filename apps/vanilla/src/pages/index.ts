import { getUrl } from '../core/utils/anime';

import Table from './table';

window.addEventListener('DOMContentLoaded', () => {
  tableAnime();
});

function tableAnime() { /** TODO: Add url: string in tableAnime */
  return new Table(getUrl());
}

