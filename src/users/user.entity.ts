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
export class User extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    @Column({
        nullable: true,
    })
    nickname: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column('text', {
        nullable: true,
    })
    introduction: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}
