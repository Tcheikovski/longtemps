import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ type: 'uuid' })
  declare readonly sub: string;

  @Column({ type: 'varchar' })
  declare username: string;

  @Column({ type: 'varchar' })
  declare email: string;
}

type AuthUser = User;
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends AuthUser {}
  }
}
