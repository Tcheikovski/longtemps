import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from 'src/users/user.entity'

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  public declare readonly id: string

  @Column('varchar')
  public declare title: string

  @Column('text')
  public declare content: string

  @ManyToOne(() => User)
  public declare createdBy: User

  @CreateDateColumn()
  public declare createdAt: Date

  @UpdateDateColumn()
  public declare updatedAt: Date
}
