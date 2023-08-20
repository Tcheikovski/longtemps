import { HttpException, HttpStatus } from '@nestjs/common'

export enum AuthError {
  UNAUTHORIZED = 'unauthorized',
  MISSING_SCOPE = 'missing_scope',
  INVALID_SCOPE = 'invalid_scope',
}

export class AuthException extends HttpException {
  static for (error: AuthError): AuthException {
    return new AuthException({ error }, this.getCode(error))
  }

  private static getCode (error: AuthError): HttpStatus {
    switch (error) {
      case AuthError.INVALID_SCOPE:
      case AuthError.MISSING_SCOPE:
        return HttpStatus.FORBIDDEN
      default:
        return HttpStatus.UNAUTHORIZED
    }
  }
}
