import { Injectable } from '@nestjs/common';
import { GithubProject } from './interfaces/githubProject';

interface GetRepoOptions {
  owner: string;
  name: string;
}

@Injectable()
export class GithubService {
  constructor() {
  }

  async getRepository({ owner, name }: GetRepoOptions): Promise<GithubProject> {
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${name}`);
      const repository = await response.json();

      return {
        url: repository.html_url,
        name: repository.name,
        externalCreatedAt: new Date(repository.created_at),
        ownerName: repository.owner.login,
        starsCount: repository.stargazers_count,
        forksCount: repository.forks_count,
        issuesCount: repository.open_issues_count,
      };
    } catch (error: any) {
      throw new Error(`Failed to fetch GitHub repo: ${error?.message || ''}`);
    }
  }
}
