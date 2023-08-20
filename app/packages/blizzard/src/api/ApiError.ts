export interface ApiErrorData {
  code: number
  type?: string
  detail?: string
}

export class ApiError extends Error implements ApiErrorData {
  public code: number
  public type?: string
  public detail?: string

  constructor (data: ApiErrorData) {
    super(data.detail)
    this.name = new.target.name
    this.code = data.code
    this.type = data.type
    this.detail = data.detail
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
