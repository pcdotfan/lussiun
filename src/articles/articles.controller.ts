import { Controller,
    Get,
    Param,
    Patch,
    Post,
    Req,
    Body, UsePipes, HttpException, HttpStatus, Injectable, UseGuards, Delete, UseInterceptors, FileInterceptor, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleDto } from './dto/article.dto';
import { ArticlesService } from './articles.service';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { ConfigService } from '../config/config.service';
import { Article } from './article.entity';
import { ValidationPipe } from '../validation.pipe';
import * as _ from 'lodash';
import * as gravatar from 'gravatar';
import * as Qiniu from 'node-qiniu-sdk';

@Injectable()
@Controller('articles')
export class ArticlesController {
    constructor(
        private readonly articlesService: ArticlesService,
        private readonly usersService: UsersService,
        private readonly categoriesService: CategoriesService,
        private config: ConfigService,
    ) { }

    @Get()
    async findAll(@Req() request): Promise<Article[]> {
        const articles = await this.articlesService.where({ status: request.query.status });

        // 参考 egg-cnode 的写法，用 Promise.all 的方法让 Array.map 内部可异步
        await Promise.all(
            articles.map(async article => {
                let user = await this.usersService.findOneById(article.userId);
                const category = await this.categoriesService.findOneById(article.categoryId);
                const avatar = gravatar.url(user.email);
                user = _.assign(user, { avatar });
                article = _.assign(article, { user }, { category });
            }),
        );

        return articles;
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    async create(@Req() request, @Body() articleDto: ArticleDto): Promise<Article> {
        const articleExisted =
            await this.articlesService.where({ slug: articleDto.slug });

        if (!articleExisted) {
            return await this.articlesService.create(articleDto);
        }

        throw new HttpException('已存在相同别名的文章', HttpStatus.FORBIDDEN);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    async update(@Param('id') id, @Body() articleDto: ArticleDto): Promise<object> {
        return await this.articlesService.update(id, articleDto);
    }

    @Get('mock')
    async mock(): Promise<string> {
        await this.articlesService.mock(20, 6, 2);
        return 'done';
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<Article> {
        return await this.articlesService.findOneById(id);
    }

    @Delete(':id')
    async destory(@Param('id') id): Promise<any> {
        return await this.articlesService.destroy(id);
    }

    @Post('upload')
    // 暂时只允许图片上传
    @UseInterceptors(FileInterceptor('file', {
        limits: {
            files: 1,
            fileSize: 2 * 10 * 10 * 10 * 10 * 10 * 10 * 10, // 限制图片大小
        },
        fileFilter (req, file, callback) {
            // 只允许上传jpg|png|jpeg|gif格式的文件
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return callback(new Error('仅允许上传图片文件！'), false);
            }
            callback(null, true);
        },
    }))
    async upload(@UploadedFile() image) {
        const qiniuService = new Qiniu(this.config.get('QINIU_AK'), this.config.get('QINIU_SK'));
        const bucket = this.config.get('QINIU_BUCKET');
        const fileService = qiniuService.file(`${bucket}:${image.originalname}`);
        fileService.zone = this.config.get('QINIU_ZONE');
        return await fileService.upload({ stream: image.buffer });
    }

}