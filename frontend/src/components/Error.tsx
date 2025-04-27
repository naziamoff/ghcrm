import React, { FC } from "react";
import { Container, Typography } from "@mui/material";

interface Props {
  text: string;
}

export const Error: FC<Props> = ({ text }) => (
  <Container maxWidth="sm">
    <Typography variant="h6" color="error">
      {text}
    </Typography>
  </Container>
);
