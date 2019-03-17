import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from '../categories/categories.module';
import { UsersModule } from '../users/users.module';
import { ArticleSchema } from './article.schema';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]), UsersModule, CategoriesModule],
    controllers: [ArticlesController],
    providers: [ArticlesService],
    exports: [ArticlesService],
})
export class ArticlesModule { }
