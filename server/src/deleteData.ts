import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import Dog from './dog/schemas/dog.schema';
import Breed from './breed/schemas/breed.schema';

dotenv.config({ path: '.env.development' });

const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    try {
      await Dog.deleteMany();
      await Breed.deleteMany();
      console.log('All data has been deleted!');
    } catch (e) {
      console.error('Error in deleting data!');
    } finally {
      process.exit();
    }
  })
  .catch((err) => console.log(err));
