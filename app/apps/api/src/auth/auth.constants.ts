import { InjectionToken } from '@nestjs/common'

export const OIDC_ISSUER: InjectionToken = Symbol('oidc:issuer')
export const OIDC_CLIENT: InjectionToken = Symbol('oidc:client')
