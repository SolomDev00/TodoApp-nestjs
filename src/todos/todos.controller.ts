/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './schemas/todo.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
export class TodoController {
  constructor(private TodService: TodoService) {}

  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Todo[]> {
    return this.TodService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createTodo(
    @Body()
    todo: CreateTodoDto,
    @Req() req,
  ): Promise<Todo> {
    return this.TodService.create(todo, req.user);
  }

  @Get(':id')
  async getTodo(
    @Param('id')
    id: string,
  ): Promise<Todo> {
    return this.TodService.findById(id);
  }

@Put(':id')
async updateTodo(
  @Param('id') id: string,
  @Body() todo: UpdateTodoDto,
): Promise<Todo> {
  return this.TodService.updateById(id, todo);
}


  @Delete(':id')
  async deleteTodo(
    @Param('id')
    id: string,
  ): Promise<Todo> {
    return this.TodService.deleteById(id);
  }
}