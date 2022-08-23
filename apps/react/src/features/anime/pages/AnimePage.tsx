import { FC, memo } from 'react';

import { AnimeList } from '../components/AnimeList/AnimeList';

const AnimePageComponent: FC = () => (
  <>
    <AnimeList />
  </>
);

export const AnimePage = memo(AnimePageComponent);
