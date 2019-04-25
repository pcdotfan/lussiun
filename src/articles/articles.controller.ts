import { Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus, Injectable, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import * as gravatar from 'gravatar';
import * as _ from 'lodash';
import * as Qiniu from 'node-qiniu-sdk';
import { ObjectID } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { ConfigService } from '../config/config.service';
import { JwtAuthGuard } from '../jwt.guard';
import { ValidationPipe } from '../validation.pipe';
import { Article } from './article.entity';
import { ArticlesService } from './articles.service';
import { ArticleDto } from './dto/article.dto';

@Injectable()
@Controller('articles')
export class ArticlesController {
    constructor(
        private readonly articlesService: ArticlesService,
        private readonly categoriesService: CategoriesService,
        private config: ConfigService
    ) { }

    @Get()
    async findAll(@Req() request: any): Promise<Article[]> {
        /*
            query:
                page Number 页数
                cat Number 分类（id）
                limit Number 每一页的文章数量
        */
        const page: number = request.query.page || 1;
        const categoryId: number | undefined = request.query.cat || undefined;
        const limit: number = request.query.limit || 10;
        let articles = [];
        const conditions: object = {
           categoryId,
        };

        articles = await this.articlesService.where(conditions, (page - 1) * limit, limit);
        await Promise.all(
            // 参考 egg-cnode 的写法，用 Promise.all 的方法让 Array.map 内部可异步
            articles.map(async article => {
                let user = await article.user;
                const category = await article.category;
                const avatar = gravatar.url(user.email);
                user = _.assign(user, { avatar });
                user = _.omit(user, ['password', 'createdAt', 'updatedAt']);
                article = _.assign(article, { user }, { category });
            })
        );

        return articles;
    }

    @Post()
    @UseGuards(new JwtAuthGuard())
    @UsePipes(ValidationPipe)
    async create(@Body() articleDto: ArticleDto, @Req() request: any): Promise<Article> {
        const articleExisted =
            await this.articlesService.where({ slug: articleDto.slug });

        if (articleExisted.length === 0) {
            articleDto.userId = request.user.id;
            return await this.articlesService.create(articleDto);
        }

        throw new HttpException('已存在相同别名的文章', HttpStatus.FORBIDDEN);
    }

    @Patch(':id')
    @UseGuards(new JwtAuthGuard())
    @UsePipes(ValidationPipe)
    async update(@Param('id') id: ObjectID, @Body() articleDto: ArticleDto): Promise<object> {
        const article = await this.articlesService.findOneById(id);
        if (article.categoryId !== articleDto.categoryId) {
            await this.categoriesService.countControl(article.categoryId, false);
            await this.categoriesService.countControl(articleDto.categoryId, true);
        }
        return await this.articlesService.update(id, articleDto);
    }

    @Get('mock')
    async mock(): Promise<string> {
        await this.articlesService.mock(20, 1);
        return 'done';
    }

    @Get(':id')
    async findOne(@Param('id') id: ObjectID): Promise<Article> {
        let article = await this.articlesService.findOneById(id);
        let user = await article.user;
        const category = await article.category;
        const avatar = gravatar.url(user.email);
        user = _.assign(user, { avatar });
        user = _.omit(Object(user), ['password', 'createdAt', 'updatedAt']);
        article = _.assign(article, { user }, { category });

        return article;
    }

    @Delete(':id')
    async destory(@Param('id') id: ObjectID): Promise<object> {
        const article = await this.articlesService.findOneById(id);
        return await this.articlesService.destroy(id);
    }

    @UseGuards(new JwtAuthGuard())
    @Post('upload')
    // 暂时只允许图片上传
    // @UseInterceptors(FileInterceptor('file', {
    //     limits: {
    //         files: 1,
    //         fileSize: 2 * 10 * 10 * 10 * 10 * 10 * 10 * 10, // 限制图片大小 2MB
    //     },
    //     fileFilter(req, file, callback) {
    //         // 只允许上传jpg|png|jpeg|gif格式的文件
    //         if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    //             return callback(new Error('仅允许上传图片文件！'), false);
    //         }
    //         callback(null, true);
    //     },
    // }))
    async upload(@UploadedFile() image: any): Promise<object> {
        const qiniuService = new Qiniu(this.config.get('QINIU_AK'), this.config.get('QINIU_SK'));
        const bucket: string = this.config.get('QINIU_BUCKET');
        const baseUrl: string = this.config.get('QINIU_URL');

        // 重置文件名
        const re = /(?:\.([^.]+))?$/;
        const ext = re.exec(image.originalname)[1];
        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);
        image.originalname = `${timestamp}.${ext}`;

        const fileService = qiniuService.file(`${bucket}:${image.originalname}`).tabZone(this.config.get('QINIU_ZONE'));
        let fileUploaded =  await fileService.upload({ stream: image.buffer });

        const url: string = `${baseUrl}/${fileUploaded.key}`;
        fileUploaded = _.assign(fileUploaded, { url });
        return fileUploaded;
    }
}
