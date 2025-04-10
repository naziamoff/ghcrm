import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GithubService } from '../github/github.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { Project } from '@prisma/client';
import { DeleteProjectDto } from './dto/DeleteProject.dto';
import { RefreshProjectDto } from './dto/RefreshProject.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly githubService: GithubService,
  ) {
  }

  async findAllByUserId(userId: number) {
    return this.prismaService.project.findMany({
      where: { userId },
    });
  }

  async create(
    createProjectDto: CreateProjectDto,
    userId: number,
  ): Promise<Project> {
    const { owner, name } = this.parseRepoPath(createProjectDto.path);

    const project = await this.githubService.getRepository({ owner, name });

    const existingProject = await this.prismaService.project.findFirst({
      where: { name, ownerName: owner, userId },
    });

    if (existingProject) {
      throw new BadRequestException('Project is already added');
    }

    return this.prismaService.project.create({
      data: {
        ...project,
        userId,
      },
    });
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

  private parseRepoPath(path: string) {
    const regex = /^([\w-]+)\/([\w-]+)$/; // Matches "owner/repo" with alphanumeric and dashes
    const match = path.match(regex);

    if (!match) {
      throw new BadRequestException('Invalid project path. Must be in the format "owner/repo".');
    }

    return {
      owner: match[1],
      name: match[2],
    };
  }
}
