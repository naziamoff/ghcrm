import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { Authorized } from '../auth/decorators/authorized.decorator';

@Controller('/projects')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getProjects(@Authorized('id') userId: number) {
    return this.projectService.findAllByUserId(userId);
  }

  @Get(':id')
  async getProject(
    @Authorized('id') userId: number,
    @Param('id') projectId: number,
  ) {
    return this.projectService.findUnique(projectId, userId);
  }

  @Delete(':id')
  async delete(@Authorized('id') userId: number, @Param('id') id: string) {
    return this.projectService.delete({
      id: Number(id),
      userId,
    });
  }

  @Post('/create')
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Authorized('id') userId: number,
  ) {
    return this.projectService.createAsync(createProjectDto, userId);
  }

  @Get('/refresh/:id')
  async refresh(@Authorized('id') userId: number, @Param('id') id: string) {
    return this.projectService.refresh({
      id: Number(id),
      userId,
    });
  }
}
