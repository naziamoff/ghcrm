import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ProjectItem } from './ProjectItem';
import React, { FC, useEffect } from 'react';
import { useHandleUpdate } from './hooks/useHandleUpdate';
import { useHandleDelete } from './hooks/useHandleDelete';
import { useProjectsContext } from './hooks/useProjectsContext';
import { useFetchProjects } from './hooks/useFetchProjects';

export const ProjectsTable: FC = () => {
  const projects = useProjectsContext(state => state.projects);

  const { fetchProjects } = useFetchProjects();
  const { handleUpdate } = useHandleUpdate();
  const { handleDelete } = useHandleDelete();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Owner</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Stars</TableCell>
            <TableCell>Forks</TableCell>
            <TableCell>Issues</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <ProjectItem
              project={project}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              key={project.id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
