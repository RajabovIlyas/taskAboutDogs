import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BreedService } from './breed.service';
import { BreedSchema } from './schemas/breed.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Breed', schema: BreedSchema }]),
  ],
  providers: [BreedService],
  exports: [BreedService],
})
export class BreedModule {}
