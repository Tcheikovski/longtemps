import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { transformer } from './transformer'
import { UserEntity } from './UserEntity'

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  public declare id: string

  @Column({ type: 'uuid' })
  public declare userId: string

  @Column({ type: 'varchar' })
  public declare type: string

  @Column({ type: 'varchar' })
  public declare provider: string

  @Column({ type: 'varchar' })
  public declare providerAccountId: string

  @Column({ type: 'varchar', nullable: true })
  public declare refresh_token: string | null

  @Column({ type: 'varchar', nullable: true })
  public declare access_token: string | null

  @Column({ type: 'bigint', nullable: true, transformer: transformer.bigint })
  public declare expires_at: number | null

  @Column({ type: 'varchar', nullable: true })
  public declare token_type: string | null

  @Column({ type: 'varchar', nullable: true })
  public declare scope: string | null

  @Column({ type: 'varchar', nullable: true })
  public declare id_token: string | null

  @Column({ type: 'varchar', nullable: true })
  public declare session_state: string | null

  @ManyToOne(() => UserEntity, user => user.accounts, { createForeignKeyConstraints: true })
  public declare user: UserEntity
}
