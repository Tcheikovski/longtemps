import { Controller, Get, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { OidcAuthGuard } from './auth/oidc.guard'

@Controller()
export class AppController {
  private readonly appService: AppService

  constructor (appService: AppService) {
    this.appService = appService
  }

  @Get()
  @UseGuards(OidcAuthGuard)
  getHello (): string {
    return this.appService.getHello()
  }
}
