import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
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

  @OneToMany(type => Article, article => article.user)
  articles: Article[]
}
