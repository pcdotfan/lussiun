import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
    imports: [TypeOrmModule.forFeature([Article]), UsersModule, CategoriesModule],
    controllers: [ArticlesController],
    providers: [ArticlesService],
})
export class ArticlesModule { }