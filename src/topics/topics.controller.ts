import { Controller, Get, Param, Patch, Post, Body, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { TopicsService } from './topics.service';
import { Topic } from './topic.entity';
import { ValidationPipe } from '../validation.pipe';

@Controller('topics')
export class TopicsController {
    constructor(
        @InjectRepository(Topic)
        private readonly topicsService: TopicsService,
    ) { }

    @Get()
    async findAll(): Promise<Topic[]> {
        return;
    }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createTopicDto: CreateTopicDto) {
        const topicExisted =
            await this.topicsService.where({ slug: createTopicDto.slug });

        if (!topicExisted) {
            return await this.topicsService.create(createTopicDto);
        }

        throw new HttpException('已存在相同信息分类', HttpStatus.FORBIDDEN);
    }

    @Patch()
    update() {

    }

    @Get(':id')
    findOne(@Param('id') id) {
    }
}