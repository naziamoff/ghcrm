import { create } from 'zustand';
import { Project } from '../typedefs/Project';

interface ProjectsContext {
  projects: Project[];
  setProjects: (
    update: Project[] | ((projects: Project[]) => Project[]),
  ) => void;
  error: string | null;
  setError: (err: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useProjectsContext = create<ProjectsContext>()((set) => ({
  projects: [],
  setProjects: (input) =>
    set((state) => ({
      projects: typeof input === 'function' ? input(state.projects) : input,
    })),
  error: null,
  setError: (error: string | null) => set({ error }),
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
