import React, { useEffect } from "react";
import { useProjectsContext } from "../../features/projects/hooks/useProjectsContext";
import { useFetchProjects } from "../../features/projects/hooks/useFetchProjects";
import { ProjectsPageView } from "./ProjectsPageView";

export const ProjectsPageController = () => {
  const error = useProjectsContext((state) => state.error);
  const isLoading = useProjectsContext((state) => state.isLoading);

  const { fetchProjects } = useFetchProjects();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return <ProjectsPageView error={error} isLoading={isLoading} />;
};
