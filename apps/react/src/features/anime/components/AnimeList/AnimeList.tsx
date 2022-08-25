import { getAnimeList } from '@js-camp/react/store/anime/dispatchers';
import { selectAnimeList, selectAnimeListLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { CircularProgress, List } from '@mui/material';
import { Box } from '@mui/system';
import { FC, memo, useEffect, useState } from 'react';

import { Header } from '../../../components/Header';

import { AnimeItem } from '../AnimeItem/AnimeItem';

const AnimeListComponent: FC = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);

  const animeList = useAppSelector(selectAnimeList);
  const isAnimeListLoading = useAppSelector(selectAnimeListLoading);

  useEffect(() => {
    if (animeList.length === 0) {
      dispatch(getAnimeList(0));
    }
    setPage(prevState => prevState + 1);
  }, [dispatch, animeList]);

  const fetchAnimeList = () => {
    setPage(prevState => prevState + 1);
    dispatch(getAnimeList({
      page,
    }));
  };

  return (
    <Box>
      <Header/>
      <List>
        {
            animeList.map(anime => (
              <>
                <AnimeItem key={anime.id} anime={anime} />
              </>
            ))
        }
        {isAnimeListLoading && <CircularProgress />}
      </List>
    </Box>
  );
};

export const AnimeList = memo(AnimeListComponent);
