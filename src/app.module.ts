/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { LinkedinModule } from './linkedin/linkedin.module';
import { ScrapeModule } from './scrape/scrape.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/todoapp'),
    TodoModule,
    AuthModule,
    LinkedinModule,
    ScrapeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
