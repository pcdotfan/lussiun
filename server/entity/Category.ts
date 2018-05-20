import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm'
import { Article } from './Article'

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() name: string

  @Column({
    unique: true
  })
  slug: string

  @Column({
    nullable: true
  })
  description: string

  @OneToMany(type => Article, article => article.category)
  articles: Article[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
