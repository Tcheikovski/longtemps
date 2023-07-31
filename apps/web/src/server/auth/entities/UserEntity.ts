import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { WowAccount } from '../../../blizzard'
import { transformer } from './transformer'
import { SessionEntity } from './SessionEntity'
import { AccountEntity } from './AccountEntity'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public declare id: string

  @Column({ type: 'varchar', nullable: true })
  public declare name: string | null

  @Column({ type: 'varchar', nullable: true, unique: true })
  public declare email: string | null

  @Column({ type: 'varchar', nullable: true, transformer: transformer.date })
  public declare emailVerified: string | null

  @Column({ type: 'varchar', nullable: true })
  public declare image: string | null

  @OneToMany(() => SessionEntity, session => session.userId)
  public declare sessions: SessionEntity[]

  @OneToMany(() => AccountEntity, account => account.userId)
  public declare accounts: AccountEntity[]

  @Column('json', { transformer: transformer.json })
  public declare wowAccounts: WowAccount[]
}
