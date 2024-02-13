/* eslint-disable prettier/prettier */
import { Types } from 'mongoose';

export interface ILoginResponse {
  token: string;
  _id: Types.ObjectId | string;
  name: string;
  todos: number;
  status: number;
}
