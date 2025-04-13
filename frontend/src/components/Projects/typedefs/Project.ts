export interface Project {
  id: number;
  ownerName: string;
  name: string;
  url: string;
  starsCount: number;
  forksCount: number;
  issuesCount: number;
  createdAt: number;
  externalCreatedAt: number;
  isOptimistic: boolean;
}
