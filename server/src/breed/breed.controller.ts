import { Controller, Get, Request } from "@nestjs/common";
import { BreedService } from "./breed.service";

@Controller('breed')
export class BreedController {
  constructor(private breedService: BreedService,
  ) {}

  @Get()
  async getImage() {
    return this.breedService.getAll();
  }
}
