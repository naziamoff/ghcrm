export interface GetGithubRepositoryResult {
  html_url: string;
  name: string;
  created_at: string;
  owner: { login: string };
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}
