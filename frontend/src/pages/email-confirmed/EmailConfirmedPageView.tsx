import React, { FC } from "react";
import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Loader } from "../../components/Loader";
import { Error } from "../../components/Error";

interface Props {
  isLoading: boolean;
  error: string | null;
}

export const EmailConfirmedPageView: FC<Props> = ({ isLoading, error }) => {
  if (isLoading) {
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
        Your email has been successfully confirmed. Sign in to proceed.
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
