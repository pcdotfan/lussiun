import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly nickname: string;
  readonly email: string;
  readonly password: string;
  readonly introduction: string;
}
