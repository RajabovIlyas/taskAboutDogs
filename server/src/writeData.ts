import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import Dog from './dog/schemas/dog.schema';
import Breed from './breed/schemas/breed.schema';
import axios from 'axios';
dotenv.config({ path: '.env.development' });

const mongoUrl = process.env.MONGO_URL;

const getOrCreateBreed = async ({ title }: { title: string }) => {
  const result = await Breed.findOne({ title });
  return result ? result : Breed.create({ title });
};

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    if ((await Dog.count()) !== 0) {
      console.error('Data is already present!');
      process.exit();
    }
    console.log('Write data!');
    for (let i = 0; i < 100; i++) {
      const dots = '.'.repeat(i / 5);
      const left = 20 - i / 5;
      const empty = ' '.repeat(left);
      const { message } = await axios
        .get('https://dog.ceo/api/breeds/image/random')
        .then(({ data }) => data)
        .catch((err) => {
          console.error('Error request!');
          process.exit();
        });
      const arrayStr = message.split('/');
      const title = arrayStr[arrayStr.length - 1].split('.')[0];
      const breed = await getOrCreateBreed({
        title: arrayStr[arrayStr.length - 2],
      });
      await Dog.create({
        breed: breed._id,
        title: title,
        image: message,
      });
      process.stdout.write(`\r[${dots}${empty}] ${i + '%'}`);
    }

    process.exit();
  })
  .catch((err) => console.log(err));
