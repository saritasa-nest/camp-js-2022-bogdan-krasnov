import { FC, memo } from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

import { Anime } from '@js-camp/core/models/anime';

import styles from './AnimeItem.module.css';

interface AnimeProps {

  /** Anime. */
  readonly anime: Anime;
}

const AnimeItemComponent: FC<AnimeProps> = AnimeProps => (
  <ListItem className={styles['animeListItem']}>
    <ListItemAvatar>
      <Avatar
        src={AnimeProps.anime.imageSrc}
      />
    </ListItemAvatar>
    <ListItemText>
      <Typography>{AnimeProps.anime.titleEnglish}</Typography>
      <Typography>{AnimeProps.anime.titleJapanese}</Typography>
    </ListItemText>
  </ListItem>
);

export const AnimeItem = memo(AnimeItemComponent);
