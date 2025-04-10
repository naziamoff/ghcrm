import { Button, TableCell, TableRow } from '@mui/material';
import React, { FC } from 'react';
import { Project } from './typedefs/Project';

interface Props {
  project: Project;
  handleUpdate: (id: string) => void;
  handleDelete: (id: string) => void;
}

export const ProjectItem: FC<Props> = ({
                                         project,
                                         handleUpdate,
                                         handleDelete,
                                       }) => {
  return (
    <TableRow key={project.id}>
      <TableCell>{project.ownerName}</TableCell>
      <TableCell>{project.name}</TableCell>
      <TableCell>
        <a href={project.url} target="_blank" rel="noopener noreferrer">
          {project.url}
        </a>
      </TableCell>
      <TableCell>{project.starsCount}</TableCell>
      <TableCell>{project.forksCount}</TableCell>
      <TableCell>{project.issuesCount}</TableCell>
      <TableCell>
        {Math.floor(new Date(project.externalCreatedAt).getTime() / 1000)}
      </TableCell>
      <TableCell align="right">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => handleUpdate(project.id)}
          style={{ marginRight: 8 }}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(project.id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};
