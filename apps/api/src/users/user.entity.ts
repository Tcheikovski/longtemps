import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn({ type: 'uuid' })
  declare readonly sub: string

  @Column({ type: 'varchar' })
  declare username: string

  @Column({ type: 'varchar' })
  declare email: string
}

type AuthUser = User;
declare global {

  namespace Express {

    export interface User extends AuthUser {}
  }
}
