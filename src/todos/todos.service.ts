/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Todo } from './schemas/todo.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: Model<Todo>,
  ) {}

  async findAll(query: Query, user: User): Promise<Todo[]> {
    const resPerPage = 10;
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
      .find({ ...keyword, user: user.id })
      .limit(resPerPage)
      .skip(skip);
    return todos;
  }

  async create(todo: Todo, user: User): Promise<Todo> {
    const data = Object.assign(todo, { user: user.id });

    const res = await this.todoModel.create(data);
    return res;
  }

  async findById(id: string, user: User): Promise<Todo> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const todo = await this.todoModel.findOne({ _id: id, user: user.id });

    if (!todo) {
      throw new NotFoundException('Todo not found.');
    }

    return todo;
  }

  async updateById(id: string, updatedTodo: Todo, user: User): Promise<Todo> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }
    const todo = await this.todoModel.findOneAndUpdate(
      { _id: id, user: user.id },
      updatedTodo,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!todo) {
      throw new NotFoundException('Todo not found.');
    }
    return todo;
  }

  async deleteById(id: string, user: User): Promise<Todo> {
    return await this.todoModel.findOneAndDelete({ _id: id, user: user.id });
  }
}
