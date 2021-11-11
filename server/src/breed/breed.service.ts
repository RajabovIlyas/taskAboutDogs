import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IBreed } from './interfaces/breed.interface';
import { CreateBreedDto } from './dto/create.breed.dto';

@Injectable()
export class BreedService {
  constructor(
    @InjectModel('Breed') private readonly breedModel: Model<IBreed>,
  ) {}

  async create(data: CreateBreedDto) {
    return this.breedModel.create(data);
  }

  async getIdByTitle(title: string) {
    return this.breedModel.findOne({ title }).exec();
  }
  async getOrCreate(data: CreateBreedDto) {
    const result = await this.getIdByTitle(data.title);
    return result ? result : this.create(data);
  }

  async deleteAll() {
    return this.breedModel.deleteMany();
  }

  async getAll() {
    return this.breedModel.find().exec();
  }
}
