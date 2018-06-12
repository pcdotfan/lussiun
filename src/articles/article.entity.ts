import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    RelationId,
    BaseEntity,
} from 'typeorm';
import { Category } from '../categories/category.entity';
import { User } from '../users/user.entity';

@Entity()
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column() title: string;

    @Column()
    slug: string;

    @Column('text') content: string;

    // -1：已删除 0: 草稿; 1: 待审核 2: 已发布
    @Column({ type: 'tinyint' }) status: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column()
    categoryId: number;

    @ManyToOne(type => Category)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @ManyToOne(type => User, user => user.articles)
    user: User;

    @RelationId((article: Article) => article.user)
    userId: number;
}