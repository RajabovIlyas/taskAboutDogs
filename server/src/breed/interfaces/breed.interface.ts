import { Document } from 'mongoose';

export interface IBreed extends Document {
  readonly title: string;
}
