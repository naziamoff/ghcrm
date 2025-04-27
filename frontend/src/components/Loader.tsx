import React from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';

interface Props {
  text: string;
}

export const Loader: React.FC<Props> = ({ text }) => (
  <Container maxWidth="sm">
    <CircularProgress />
    <Typography variant="body1">{text}</Typography>
  </Container>
);

