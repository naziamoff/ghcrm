import React from 'react';
import { Alert, CircularProgress, Container, Typography } from '@mui/material';
import { ProjectsTable } from './ProjectsTable';
import { AddProjectModule } from './AddProjectModule';
import { useProjectsContext } from './hooks/useProjectsContext';

export const ProjectsPage = () => {
  const error = useProjectsContext(state => state.error);
  const isLoading = useProjectsContext(state => state.isLoading);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Project List
      </Typography>

      {error && (
        <Alert severity="error">{error}</Alert>
      )}

      <AddProjectModule />

      <ProjectsTable />

      {isLoading && <CircularProgress />}
    </Container>
  );
};
