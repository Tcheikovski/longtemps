import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { IntrospectionAuthGuard } from './guards'

export function Auth (...scopes: string[]) {
  return applyDecorators(
    SetMetadata('scopes', scopes),
    UseGuards(IntrospectionAuthGuard)
  )
}
