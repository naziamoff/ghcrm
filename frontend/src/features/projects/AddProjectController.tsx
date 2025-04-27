import React, { FC } from "react";
import { AddProjectView } from "./AddProjectView";
import { useAddProject } from "./hooks/useAddProject";

export const AddProjectController: FC = () => {
  const { handleAddProject } = useAddProject();

  return <AddProjectView handleAddProject={handleAddProject} />;
};
