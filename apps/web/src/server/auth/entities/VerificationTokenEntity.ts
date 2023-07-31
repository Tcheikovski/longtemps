import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { transformer } from './transformer'

@Entity({ name: 'verification_tokens' })
export class VerificationTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  public declare id: string

  @Column({ type: 'varchar' })
  public declare token: string

  @Column({ type: 'varchar' })
  public declare identifier: string

  @Column({ type: 'varchar', transformer: transformer.date })
  public declare expires: string
}
