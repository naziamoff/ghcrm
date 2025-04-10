import React, { useEffect } from 'react';
import { Alert, CircularProgress, Container, Typography } from '@mui/material';
import { useProjects } from './hooks/useProjects';
import { ProjectsTable } from './ProjectsTable';
import { AddProjectModule } from './AddProjectModule';

export const ProjectsPage = () => {
  const {
    error,
    loading,
    projects = [],
    fetchProjects,
    handleAddProject,
    handleUpdate,
    handleDelete,
  } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Project List
      </Typography>

      {error && (
        <Alert severity="error">{error}</Alert>
      )}

      <AddProjectModule handleAddProject={handleAddProject} />

      <ProjectsTable
        projects={projects}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />

      {loading && <CircularProgress />}
    </Container>
  );
};
