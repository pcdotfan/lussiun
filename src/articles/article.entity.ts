import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    ObjectID,
    ObjectIdColumn,
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

    @Column(type => Category)
    category: Category;

    @Column(type => User)
    user: User;
}
