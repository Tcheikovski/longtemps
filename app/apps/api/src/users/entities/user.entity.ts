import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Article } from '../../articles/entities/article.entity'

@Entity()
export class User {
  @PrimaryColumn({ type: 'uuid' })
  declare readonly id: string

  @Column({ type: 'varchar' })
  declare username: string

  @OneToMany(() => Article, article => article.createdBy)
  declare articles: Article[]
}
