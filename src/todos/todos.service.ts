/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Todo } from './schemas/todo.schema';

import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: mongoose.Model<Todo>,
  ) {}

  async findAll(query: Query): Promise<Todo[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const todos = await this.todoModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return todos;
  }

  async create(book: Todo, user: User): Promise<Todo> {
    const data = Object.assign(book, { user: user._id });

    const res = await this.todoModel.create(data);
    return res;
  }

  async findById(id: string): Promise<Todo> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const book = await this.todoModel.findById(id);

    if (!book) {
      throw new NotFoundException('Todo not found.');
    }

    return book;
  }

  async updateById(id: string, book: Todo): Promise<Todo> {
    return await this.todoModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Todo> {
    return await this.todoModel.findByIdAndDelete(id);
  }
}
