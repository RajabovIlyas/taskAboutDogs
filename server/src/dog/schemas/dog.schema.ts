import { Schema, model } from 'mongoose';
import { IDog } from '../interfaces/dog.interface';

export const DogSchema = new Schema({
  breed: { type: Schema.Types.ObjectId, ref: 'Breed', required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
});

DogSchema.index({ name: 'text', title: 'text' });

export default model<IDog>('Dog', DogSchema);
