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
  @UseGuards(AuthGuard())
  async getAllTodos(@Query() query: ExpressQuery, @Req() req): Promise<Todo[]> {
    return this.TodService.findAll(query, req.user);
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
  @UseGuards(AuthGuard())
  async getTodo(
    @Param('id')
    id: string,
    @Req() req,
  ): Promise<Todo> {
    return this.TodService.findById(id, req.user);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateTodo(
    @Param('id') id: string,
    @Body() todo: UpdateTodoDto,
    @Req() req,
  ): Promise<Todo> {
    return this.TodService.updateById(id, todo, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteTodo(
    @Param('id')
    id: string,
    @Req() req,
  ): Promise<Todo> {
    return this.TodService.deleteById(id, req.user);
  }
}
