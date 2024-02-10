/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

export enum Category {
  SCHOOL = 'School',
  VOLLEY = 'Volley',
}

@Schema({
  timestamps: true,
})
export class Todo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
