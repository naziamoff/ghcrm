import { BadRequestException } from '@nestjs/common';

export const parseRepoPath = (path: string) => {
  const regex = /^([\w-]+)\/([\w-]+)$/; // Matches "owner/repo" with alphanumeric and dashes
  const match = path.match(regex);

  if (!match) {
    throw new BadRequestException('Invalid project path. Must be in the format "owner/repo".');
  }

  return {
    owner: match[1],
    name: match[2],
  };
};
