/* eslint-disable prettier/prettier */
import { IsEmpty, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { Category } from '../schemas/todo.schema';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsOptional()
  // @IsEnum(Category, { message: 'Please enter correct category.' })
  readonly category: Category;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
