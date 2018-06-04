import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
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

    async create(topic: CreateTopicDto): Promise<Topic> {
        const newTopic = await this.topicRepository.create(topic);
        return this.topicRepository.save(newTopic);
    }

    async update(id: number, topic): Promise<Topic> {
        // body = _.omit(body, ['id'])
        // return await this.topicRepository.update(id, topic);
        return;
    }
}