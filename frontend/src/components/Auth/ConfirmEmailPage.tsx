import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export const ConfirmEmailPage = () => (
  <Container maxWidth="sm">
    <Box
      sx={{
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Confirm Your Email
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        We’ve sent you a confirmation link. Please check your inbox to activate your account.
      </Typography>
    </Box>
  </Container>
);
