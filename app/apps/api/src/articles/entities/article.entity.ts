import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from '../../users'

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  public declare readonly id: string

  @Column('varchar')
  public declare title: string

  @Column('text')
  public declare content: string

  @ManyToOne(() => User, user => user.articles)
  public declare createdBy: User

  @CreateDateColumn()
  public declare createdAt: Date

  @UpdateDateColumn()
  public declare updatedAt: Date
}
