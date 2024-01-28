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

@Controller('books')
export class TodoController {
  constructor(private bookService: TodoService) {}

  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Todo[]> {
    return this.bookService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createBook(
    @Body()
    book: CreateTodoDto,
    @Req() req,
  ): Promise<Todo> {
    return this.bookService.create(book, req.user);
  }

  @Get(':id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Todo> {
    return this.bookService.findById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    book: UpdateTodoDto,
  ): Promise<Todo> {
    return this.bookService.updateById(id, book);
  }

  @Delete(':id')
  async deleteBook(
    @Param('id')
    id: string,
  ): Promise<Todo> {
    return this.bookService.deleteById(id);
  }
}
