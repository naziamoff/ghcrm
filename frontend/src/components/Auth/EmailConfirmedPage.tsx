import React, { useEffect } from 'react';
import { Button, CircularProgress, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useConfirmEmail } from './hooks/useConfirmEmail';
import { ROUTES } from '../../routes';

export const EmailConfirmedPage = () => {
  const { confirmEmail, loading, error } = useConfirmEmail();

  useEffect(() => {
    confirmEmail();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <CircularProgress />
        <Typography variant="body1">Verifying your email...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Email Confirmation Successful
      </Typography>
      <Typography variant="body1" paragraph>
        Your email has been successfully confirmed. You can now proceed to sign in.
      </Typography>
      <Button
        component={Link}
        to={ROUTES.SignIn}
        variant="contained"
        color="primary"
      >
        Go to Sign In
      </Button>
    </Container>
  );
};
