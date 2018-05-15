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
export class Category {
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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @OneToMany(type => Article, article => article.category)
  articles: Article[]
}
