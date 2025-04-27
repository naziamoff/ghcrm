import React, { FC } from "react";
import { Alert, CircularProgress, Container, Typography } from "@mui/material";
import { ProjectsTableController } from "../../features/projects/ProjectsTableController";
import { AddProjectController } from "../../features/projects/AddProjectController";

interface Props {
  error: string | null;
  isLoading: boolean;
}

export const ProjectsPageView: FC<Props> = ({ error, isLoading }) => (
  <Container maxWidth="lg">
    <Typography variant="h4" gutterBottom>
      Project List
    </Typography>

    {error && <Alert severity="error">{error}</Alert>}

    <AddProjectController />

    <ProjectsTableController />

    {isLoading && <CircularProgress />}
  </Container>
);
