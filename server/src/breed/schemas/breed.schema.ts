import { Schema, model } from 'mongoose';
import { IBreed } from '../interfaces/breed.interface';

export const BreedSchema = new Schema({
  title: { type: String, required: true },
});

export default model<IBreed>('Breed', BreedSchema);
