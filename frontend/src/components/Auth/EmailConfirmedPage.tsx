import React, { useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useConfirmEmail } from './hooks/useConfirmEmail';
import { ROUTES } from '../../constants/routes';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';

export const EmailConfirmedPage = () => {
  const { confirmEmail, loading, error } = useConfirmEmail();

  useEffect(() => {
    confirmEmail();
  }, [confirmEmail]);

  if (loading) {
    return <Loader text="Verifying your email" />;
  }

  if (error) {
    return <Error text={error} />;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Email Confirmation Successful
      </Typography>
      <Typography variant="body1" paragraph>
        Your email has been successfully confirmed.
        Sign in to proceed.
      </Typography>
      <Button
        component={Link}
        to={ROUTES.auth.signIn}
        variant="contained"
        color="primary"
      >
        To Sign In
      </Button>
    </Container>
  );
};
