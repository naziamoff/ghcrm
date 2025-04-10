import { Project } from '@prisma/client';

export type GithubProject = Pick<
  Project,
  'url' | 'name' | 'ownerName' | 'starsCount' | 'forksCount' | 'issuesCount' | 'externalCreatedAt'
>
