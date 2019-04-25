import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    ObjectID,
    ObjectIdColumn,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';
import { User } from '../users/user.entity';

@Entity()
export class Article extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    @Column() title: string;

    @Column()
    slug: string;

    @Column('text') content: string;

    // -1：已删除 0: 草稿; 1: 待审核 2: 已发布
    @Column({ type: 'tinyint' }) status: number;

    @Column({
        default: 0,
    })
    commentCount: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column()
    categoryId: ObjectID;

    @ManyToOne(type => Category)
    @JoinColumn({ name: 'categoryId' })
    category: Promise<Category>;

    // @OneToMany(type => Comment, comment => comment.article)
    // comments: Promise<Comment[]>;

    @Column()
    userId: ObjectID;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'userId' })
    user: Promise<User>;
}
