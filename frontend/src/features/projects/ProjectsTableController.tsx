import React, { FC } from "react";
import { ProjectsTableView } from "./ProjectsTableView";
import { useProjectsContext } from "./hooks/useProjectsContext";
import { useHandleUpdate } from "./hooks/useHandleUpdate";
import { useHandleDelete } from "./hooks/useHandleDelete";

export const ProjectsTableController: FC = () => {
  const projects = useProjectsContext((state) => state.projects);
  const { handleUpdate } = useHandleUpdate();
  const { handleDelete } = useHandleDelete();

  return (
    <ProjectsTableView
      projects={projects}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />
  );
};
