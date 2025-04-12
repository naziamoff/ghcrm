import React from 'react';
import { Container, Typography } from '@mui/material';

interface Props {
  text: string;
}

export const Error: React.FC<Props> = ({ text }) => (
  <Container maxWidth="sm">
    <Typography variant="h6" color="error">
      {text}
    </Typography>
  </Container>
);

