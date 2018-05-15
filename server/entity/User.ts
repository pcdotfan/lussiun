import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Article } from './Article'

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number

  @Column({
    nullable: true
  })
  nickname: string

  @Column() username: string

  @Column() email: string

  @Column() password: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @OneToMany(type => Article, article => article.user)
  articles: Article[]
}
