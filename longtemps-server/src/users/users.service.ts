import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUserinfo } from '../auth';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private declare readonly repository: Repository<User>;

  public async find(sub: string): Promise<User | null> {
    return await this.repository.findOneBy({ sub });
  }

  public async findOrCreate(sub: string): Promise<User> {
    const user = await this.find(sub);
    return user ?? this.repository.create({ sub });
  }

  public async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  public async getByInfo(info: IUserinfo): Promise<User> {
    const user = await this.findOrCreate(info.sub);
    return this.repository.merge(user, {
      username: info.username,
      email: info.email,
    });
  }
}
