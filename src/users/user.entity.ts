import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Article } from '../articles/article.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn() public id: number;

    @Column({
        nullable: true,
    })
    public nickname: string;

    @Column()
    public username: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column('text', {
        nullable: true,
    })
    public introduction: string;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt: Date;

    @OneToMany((type) => Article, (article) => article.user)
    public articles: Promise<Article[]>;
}
