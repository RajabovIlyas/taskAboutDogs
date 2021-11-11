import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IDog } from './interfaces/dog.interface';
import { BreedService } from '../breed/breed.service';
import axios from 'axios';
import { CreateDogDto } from './dto/create.dog.dto';

@Injectable()
export class DogService {
  constructor(
    @InjectModel('Dog') private readonly dogModel: Model<IDog>,
    private breedService: BreedService,
  ) {}

  async create(data: CreateDogDto) {
    return this.dogModel.create(data);
  }

  async get(
    page = 1,
    limit = 10,
    searchTitle: string | undefined,
    breedFilter: string | undefined,
  ) {
    let optionFind = {};
    if (searchTitle) {
      optionFind = { title: { $regex: searchTitle, $options: 'i' } };
    }
    if (breedFilter) {
      optionFind = { ...optionFind, breed: breedFilter };
    }
    const count = await this.dogModel.find(optionFind).count().exec();
    return this.dogModel
      .find(optionFind)
      .limit(limit)
      .skip((page - 1) * limit)
      .populate({ path: 'breed' })
      .exec()
      .then(async (result) => ({
        data: result,
        page: page,
        limit: limit,
        total: count,
      }));
  }

  async deleteAll() {
    try {
      await this.dogModel.deleteMany();
      await this.breedService.deleteAll();
      return { message: 'All data has been deleted', code: 200 };
    } catch (e) {
      throw new HttpException(
        {
          message: 'Error in deleting data!',
          code: HttpStatus.NOT_IMPLEMENTED,
        },
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }

  async createFromUrl() {
    const total = await this.dogModel.count();
    if (total !== 0) {
      throw new HttpException(
        {
          message: 'Data is already present!',
          code: HttpStatus.NOT_IMPLEMENTED,
        },
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
    const array = [];
    for (let i = 0; i < 100; i++) {
      const { message } = await axios
        .get('https://dog.ceo/api/breeds/image/random')
        .then(({ data }) => data)
        .catch((err) => {
          throw new HttpException(
            { message: 'Error request!', code: HttpStatus.NOT_IMPLEMENTED },
            HttpStatus.NOT_IMPLEMENTED,
          );
        });
      const arrayStr = message.split('/');
      const title = arrayStr[arrayStr.length - 1].split('.')[0];
      const breed = await this.breedService.getOrCreate({
        title: arrayStr[arrayStr.length - 2],
      });
      array.push(
        await this.create({
          breed: breed._id,
          title: title,
          image: message,
        }),
      );
    }
    return array;
  }
}
