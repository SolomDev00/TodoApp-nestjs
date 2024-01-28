import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { TodoController } from './todos.controller';
import { TodoService } from './todos.service';
import { TodoSchema } from './schemas/todo.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
