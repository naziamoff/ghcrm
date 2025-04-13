import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GithubService } from '../github/github.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { Project } from '@prisma/client';
import { DeleteProjectDto } from './dto/DeleteProject.dto';
import { RefreshProjectDto } from './dto/RefreshProject.dto';
import { parseRepoPath } from './helpers/parseRepoPath';

export interface ProcessGithubRepositoryOptions {
  owner: string;
  name: string;
  projectId: number;
  userId: number;
}

interface CreateMockProjectOptions {
  ownerName: string;
  name: string;
  userId: number;
}

@Injectable()
export class ProjectService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly githubService: GithubService,
  ) {}

  async findUnique(projectId: number, userId: number): Promise<Project | null> {
    return this.prismaService.project.findUnique({
      where: {
        id: projectId,
        userId,
      },
    });
  }

  async findAllByUserId(userId: number) {
    return this.prismaService.project.findMany({
      where: { userId },
    });
  }

  /**
   * Creates a new project asynchronously, first checking if the project already exists for the user.
   * If the project does not exist, a mock project is created, and an attempt is made to fetch the actual project details from GitHub.
   * If the GitHub request fails, the mock project is deleted.
   */
  async createAsync(
    createProjectDto: CreateProjectDto,
    userId: number,
  ): Promise<Project> {
    const { owner, name } = parseRepoPath(createProjectDto.path);

    const existingProject = await this.prismaService.project.findFirst({
      where: { name, ownerName: owner, userId },
    });

    if (existingProject) {
      throw new BadRequestException('Project is already added');
    }

    const optimisticProject = await this.createOptimisticProject({
      name,
      userId,
      ownerName: owner,
    });

    this.processGithubRepository({
      owner,
      name,
      userId,
      projectId: optimisticProject.id,
    });

    return optimisticProject;
  }

  async processGithubRepository({
    owner,
    name,
    projectId,
    userId,
  }: ProcessGithubRepositoryOptions) {
    const attempt = async (retriesLeft: number, delayMs?: number) => {
      try {
        const project = await this.githubService.getRepository({ owner, name });

        await this.prismaService.project.update({
          where: { id: projectId },
          data: {
            ...project,
            isOptimistic: false,
          },
        });
      } catch {
        if (!retriesLeft) {
          await this.delete({
            id: projectId,
            userId,
          });
        } else {
          await new Promise((res) => setTimeout(res, delayMs));

          attempt(retriesLeft - 1, delayMs);
        }
      }
    };

    await attempt(3, 2000);
  }

  async delete({ id, userId }: DeleteProjectDto) {
    const project = await this.prismaService.project.findUnique({
      where: { id, userId },
    });

    if (!project) {
      throw new NotFoundException(
        'Project not found or does not belong to you',
      );
    }

    return this.prismaService.project.delete({
      where: { id: project.id },
    });
  }

  async refresh({ id, userId }: RefreshProjectDto) {
    const project = await this.prismaService.project.findUniqueOrThrow({
      where: { id, userId },
    });

    const optimisticProject = await this.prismaService.project.update({
      where: { id },
      data: {
        isOptimistic: true,
      },
    });

    this.processGithubRepository({
      owner: project.ownerName,
      name: project.name,
      userId,
      projectId: id,
    });

    return optimisticProject;
  }

  private async createOptimisticProject({
    name,
    ownerName,
    userId,
  }: CreateMockProjectOptions): Promise<Project> {
    return this.prismaService.project.create({
      data: {
        name,
        url: 'Loading...',
        ownerName,
        userId,
        starsCount: 0,
        forksCount: 0,
        issuesCount: 0,
        externalCreatedAt: new Date(),
        isOptimistic: true,
      },
    });
  }
}
