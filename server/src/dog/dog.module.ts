import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BreedModule } from '../breed/breed.module';
import { DogSchema } from './schemas/dog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Dog', schema: DogSchema }]),
    BreedModule,
  ],
  providers: [DogService],
  controllers: [DogController],
})
export class DogModule {}
