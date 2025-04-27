import React, { FC } from "react";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Error } from "../../components/Error";

interface Props {
  handleSubmit: (event: React.FormEvent) => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  isLoading: boolean;
}

export const SignInPageView: FC<Props> = ({
  handleSubmit,
  error,
  isLoading,
  email,
  setEmail,
  password,
  setPassword,
}) => (
  <Container component="main" maxWidth="xs">
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
      }}
    >
      <Typography variant="h5">Sign In</Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: "100%" }}
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

        {error && <Error text={error} />}

        <Button type="submit" fullWidth variant="contained" color="primary">
          {isLoading ? "Trying to sign in..." : "Sign in"}
        </Button>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            New to the project?{" "}
            <Link component={RouterLink} to={ROUTES.auth.signUp}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  </Container>
);
