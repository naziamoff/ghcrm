import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GithubService } from '../github/github.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { Project } from '@prisma/client';
import { DeleteProjectDto } from './dto/DeleteProject.dto';
import { RefreshProjectDto } from './dto/RefreshProject.dto';
import { parseRepoPath } from './helpers/parseRepoPath';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly githubService: GithubService,
  ) {
  }

  async findUnique(
    projectId: number,
    userId: number,
  ): Promise<Project | null> {
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
  async createAsync(createProjectDto: CreateProjectDto, userId: number): Promise<Project> {
    const { owner, name } = parseRepoPath(createProjectDto.path);

    const existingProject = await this.prismaService.project.findFirst({
      where: { name, ownerName: owner, userId },
    });

    if (existingProject) {
      throw new BadRequestException('Project is already added');
    }

    const newProject = await this.createMockProject(userId);

    new Promise(async () => {
      try {
        const project = await this.githubService.getRepository({ owner, name });

        await this.prismaService.project.update({
          where: { id: newProject.id },
          data: { ...project },
        });
      } catch (error) {
        await this.delete({
          id: newProject.id,
          userId,
        });
      }
    });

    return newProject;
  }

  async delete({ id, userId }: DeleteProjectDto) {
    const project = await this.prismaService.project
      .findUnique({ where: { id, userId } });

    if (!project) {
      throw new NotFoundException('Project not found or does not belong to you');
    }

    return this.prismaService.project.delete({
      where: { id: project.id },
    });
  }

  async refresh({ id, userId }: RefreshProjectDto) {
    const project = await this.prismaService.project.findUniqueOrThrow({
      where: { id, userId },
    });

    const githubProject = await this.githubService.getRepository({
      owner: project.ownerName,
      name: project.name,
    });

    return this.prismaService.project.update({
      where: { id },
      data: githubProject,
    });
  }

  private async createMockProject(userId: number): Promise<Project> {
    return this.prismaService.project.create({
      data: {
        name: 'Loading...',
        url: 'Loading...',
        ownerName: 'Loading...',
        userId,
        starsCount: 0,
        forksCount: 0,
        issuesCount: 0,
        externalCreatedAt: new Date(),
      },
    });
  }
}
