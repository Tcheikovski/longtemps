import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities'
import { CreateUserDto, UpdateUserDto } from './dto'

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>

  public async find (id: string): Promise<User | null> {
    return await this.repository.findOneBy({ id })
  }

  public async create (createUserDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(createUserDto)
    return await this.repository.save(user)
  }

  public async update (user: User, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = this.repository.merge(user, updateUserDto)
    return await this.repository.save(updatedUser)
  }
}
