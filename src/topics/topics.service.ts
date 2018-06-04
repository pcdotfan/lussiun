import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicDto } from './dto/topic.dto';
import { Topic } from './topic.entity';

@Injectable()
export class TopicsService {
    constructor(
        @InjectRepository(Topic)
        private readonly topicRepository: Repository<Topic>,
    ) { }

    async findOneById(id: number): Promise<Topic> {
        return await this.topicRepository.findOne({ id });
    }

    async findOneBySlug(slug: string): Promise<Topic> {
        return await this.topicRepository.findOne({ slug });
    }

    async where(condition: object): Promise<Topic[]> {
        return await this.topicRepository.find(condition);
    }

    async findAll(): Promise<Topic[]> {
        return await this.topicRepository.find();
    }

    async create(topicDto: TopicDto): Promise<Topic> {
        const newTopic = await this.topicRepository.create(topicDto);
        return this.topicRepository.save(newTopic);
    }

    async update(id: number, topicDto: TopicDto): Promise<any> {
        await this.topicRepository.update(id, topicDto);
    }

    async destroy(id: number): Promise<any> {
        await this.topicRepository.delete(id);
    }
}