import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BreedModule } from './breed/breed.module';
import { DogModule } from './dog/dog.module';
import { configModule } from './configure.root';

@Module({
  imports: [
    configModule,
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    BreedModule,
    DogModule,
  ],
})
export class AppModule {}
