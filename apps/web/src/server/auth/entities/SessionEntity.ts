import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { UserEntity } from './UserEntity'
import { transformer } from './transformer'

@Entity({ name: 'sessions' })
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  public declare id: string

  @Column({ type: 'varchar', unique: true })
  public declare sessionToken: string

  @Column({ type: 'uuid' })
  public declare userId: string

  @Column({ type: 'varchar', transformer: transformer.date })
  public declare expires: string

  @ManyToOne(() => UserEntity, user => user.sessions)
  public declare user: UserEntity
}
