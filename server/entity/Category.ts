import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
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

  @OneToMany(type => Article, article => article.category)
  articles: Article[]
}
