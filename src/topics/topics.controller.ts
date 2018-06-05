import { Controller, Get, Param, Patch, Post, Body, UsePipes, HttpException, HttpStatus, Injectable, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TopicDto } from './dto/topic.dto';
import { TopicsService } from './topics.service';
import { Topic } from './topic.entity';
import { ValidationPipe } from '../validation.pipe';

@Injectable()
@Controller('topics')
export class TopicsController {
    constructor(
        private readonly topicsService: TopicsService,
    ) { }

    @Get()
    async findAll(): Promise<Topic[]> {
        return await this.topicsService.findAll();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    async create(@Body() topicDto: TopicDto) {
        const topicExisted = await this.topicsService.where({ slug: topicDto.slug });
        if (topicExisted) {
            return await this.topicsService.create(topicDto);
        }
        throw new HttpException('已存在相同信息话题', HttpStatus.FORBIDDEN);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param() id: number, @Body() topicDto: TopicDto): Promise<object> {
        return await this.topicsService.update(id, topicDto);
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<Topic> {
        return await this.topicsService.findOneById(id);
    }

    @Delete(':id')
    async destory(@Param('id') id): Promise<any> {
        return await this.topicsService.destroy(id);
    }
}