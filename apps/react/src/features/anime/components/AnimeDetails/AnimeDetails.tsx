import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { FC, memo } from 'react';

const AnimeDetailsComponent: FC = () => (
  <Container>
    <Box>
      <Typography component="h2" variant="h4">
        <Typography>Anime</Typography>
        <Typography>Anime name</Typography>
      </Typography>
    </Box>
  </Container>
);

export const AnimeDetails = memo(AnimeDetailsComponent);
