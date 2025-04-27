import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ProjectItem } from "./ProjectItem";
import React, { FC } from "react";
import { Project } from "./typedefs/Project";

interface Props {
  projects: Project[];
  handleUpdate: (id: number) => void;
  handleDelete: (id: number) => void;
}

export const ProjectsTableView: FC<Props> = ({
  projects,
  handleUpdate,
  handleDelete,
}) => (
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
