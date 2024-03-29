/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  [x: string]: any;
  @Prop()
  name: string;
  @Prop({ unique: [true, 'Duplicate email entered!'] })
  email: string;
  @Prop()
  password: string;
  @Prop()
  todos: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
