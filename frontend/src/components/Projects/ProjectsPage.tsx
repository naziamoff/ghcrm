import React, { useEffect } from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';
import { useProjects } from './hooks/useProjects';
import { ProjectsTable } from './ProjectsTable';
import { AddProjectModule } from './AddProjectModule';

export const ProjectsPage = () => {
  const {
    loading,
    projects,
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

      <AddProjectModule handleAddProject={handleAddProject} />

      {loading
        ? <CircularProgress />
        : (
          <ProjectsTable
            projects={projects}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        )}
    </Container>
  );
};
