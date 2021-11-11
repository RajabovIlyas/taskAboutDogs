import { Document } from 'mongoose';
import { IBreed } from '../../breed/interfaces/breed.interface';

export interface IDog extends Document {
  readonly breed: IBreed;
  readonly image: string;
  readonly title: string;
}
