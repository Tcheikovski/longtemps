import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req
} from '@nestjs/common'
import { Request } from 'express'
import { Auth } from '../auth'
import { ArticlesService } from './articles.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Controller('articles')
export class ArticlesController {
  private readonly articlesService: ArticlesService

  constructor (articlesService: ArticlesService) {
    this.articlesService = articlesService
  }

  @Auth()
  @Post()
  create (
    @Req() req: Request & Express.AuthenticatedRequest,
    @Body() createArticleDto: CreateArticleDto
  ) {
    return this.articlesService.create(createArticleDto, req.user)
  }

  @Get()
  findAll () {
    return this.articlesService.findAll()
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.articlesService.findOne(id)
  }

  @Auth()
  @Patch(':id')
  update (@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.articlesService.remove(id)
  }
}
