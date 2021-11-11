import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BreedService } from './breed.service';
import { BreedSchema } from './schemas/breed.schema';
import { BreedController } from './breed.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Breed', schema: BreedSchema }]),
  ],
  providers: [BreedService],
  exports: [BreedService],
  controllers: [BreedController],
})
export class BreedModule {}
