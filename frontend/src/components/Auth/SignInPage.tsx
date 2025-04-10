import React, { useState } from 'react';
import { Box, Button, CircularProgress, Container, Link, TextField, Typography } from '@mui/material';
import { useSignIn } from './hooks/useSignIn';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '../../routes';

export const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, error, loading } = useSignIn();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    signIn(email, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 8,
        }}
      >
        <Typography variant="h5">Sign In</Typography>

        {loading && (
          <Container maxWidth="sm">
            <CircularProgress />
            <Typography variant="body1">Signing you in...</Typography>
          </Container>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              New to the project?{' '}
              <Link component={RouterLink} to={ROUTES.SignUp}>Sign up</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
