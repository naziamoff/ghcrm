import { useCallback } from 'react';
import { api } from '../../../api';
import { Project } from '../typedefs/Project';

const PENDING_PROJECT_NAME = 'Loading...';

export const usePollById = () => {
  const pollById = useCallback(
    (
      projectId: number,
      onSuccess: (polledProject: Project) => void,
      onError: (error: Error) => void,
    ) => {
      const interval = setInterval(async () => {
        const { data } = await api.get(`/projects/${projectId}`);

        if (!data) {
          clearInterval(interval);

          onError(
            new Error(`Failed to fetch project, or project does not exist`),
          );
        }

        if (!data.isOptimistic) {
          clearInterval(interval);

          onSuccess(data);
        }
      }, 3000);
    },
    [],
  );

  return { pollById };
};
