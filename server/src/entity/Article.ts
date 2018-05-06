import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'
import { Category } from './Category'

@Entity()
export class Article {
  @PrimaryGeneratedColumn() id: number

  @Column() title: string

  @Column() slug: string

  @Column('text') content: string

  @ManyToOne(type => User, user => user.articles)
  user: User

  @ManyToOne(type => Category, category => category.articles)
  category: Category
}
