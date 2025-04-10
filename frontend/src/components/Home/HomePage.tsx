import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';

export const HomePage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>
        GitHub CRM
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
        Manage your GitHub interactions like a pro.
      </Typography>

      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mr: 2 }}
          component={Link}
          to={ROUTES.SignUp}
        >
          Sign Up
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          component={Link}
          to={ROUTES.SignIn}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};
