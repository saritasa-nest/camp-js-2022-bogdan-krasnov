import { getUrl } from '../core/utils/anime';

import Table from './table';

window.addEventListener('load', () => {
  new Table().getData(getUrl());
});
