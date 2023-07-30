import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class ArticlesService {
  @InjectRepository(Article)
  private declare readonly repository: Repository<Article>;

  async create(createArticleDto: CreateArticleDto, createdBy: User) {
    const article = this.repository.create(createArticleDto);
    article.createdBy = createdBy;

    return await this.repository.save(article);
  }

  async findAll(): Promise<Article[]> {
    return await this.repository.find({ relations: { createdBy: true } });
  }

  async findOne(id: string): Promise<Article | null> {
    return await this.repository.findOne({
      where: { id },
      relations: { createdBy: true },
    });
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article | null> {
    const article = await this.findOne(id);
    if (!article) return null;

    this.repository.merge(article, updateArticleDto);
    return await this.repository.save(article);
  }

  async remove(id: string): Promise<Article | null> {
    const article = await this.findOne(id);
    if (!article) return null;

    return await this.repository.remove(article);
  }
}
