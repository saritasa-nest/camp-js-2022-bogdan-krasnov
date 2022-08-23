import { FC, memo } from 'react';
import { Typography, Toolbar, Box, AppBar } from '@mui/material';

const HeaderComponent: FC = () => (
  <Box>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="h1">
            Anime Catalog
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
);

export const Header = memo(HeaderComponent);
