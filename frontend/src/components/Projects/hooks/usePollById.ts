import { useCallback } from 'react';
import { api } from '../../../api';
import { Project } from '../typedefs/Project';

const PENDING_PROJECT_NAME = 'Loading...';

export const usePollById = () => {
  const pollById = useCallback((
    projectId: number,
    onFinished: (polledProject: Project) => void,
  ) => {
    const interval = setInterval(
      async () => {
        const { data } = await api.get(`/projects/${projectId}`);

        if (data.name !== PENDING_PROJECT_NAME) {
          clearInterval(interval);

          onFinished(data);
        }
      }, 3000);
  }, []);

  return { pollById };
};
