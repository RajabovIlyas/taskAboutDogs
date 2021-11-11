import { Controller, Delete, Get, Post, Request } from '@nestjs/common';
import { DogService } from './dog.service';

@Controller('dog')
export class DogController {
  constructor(private dogService: DogService) {}

  @Post()
  async addManyBreeds() {
    return this.dogService.createFromUrl();
  }

  @Get()
  async getImage(@Request() req) {
    const { page = '1', limit = '10', searchTitle, breedFilter } = req.query;
    return this.dogService.get(
      Number.parseInt(page),
      Number.parseInt(limit),
      searchTitle,
      breedFilter,
    );
  }
  @Delete()
  async deleteAll() {
    return this.dogService.deleteAll();
  }
}
