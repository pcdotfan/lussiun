import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ObjectID,
    ObjectIdColumn,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';
import { Article } from '../articles/article.entity';

@Entity()
export class Category extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    @Column()
    name: string;

    @Column({
        unique: true,
    })
    slug: string;

    @Column({
        default: 0,
    })
    count: number;

    @Column({
        nullable: true,
    })
    description: string;

    @Column(type => Article)
    articles: Promise<Article[]>;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
