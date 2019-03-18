import { Document } from 'mongoose';

export interface Category extends Document {
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly count: number;
}
