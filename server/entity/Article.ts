import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User'
import { Category } from './Category'

@Entity()
export class Article {
  @PrimaryGeneratedColumn() id: number

  @Column() title: string

  @Column() slug: string

  @Column('text') content: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @ManyToOne(type => User, user => user.articles)
  user: User

  @ManyToOne(type => Category, category => category.articles)
  category: Category
}
