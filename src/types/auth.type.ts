import { User } from './user.type'
import { Response } from './utill.type'

export type AuthResponse = Response<{
  access_token: string
  expires: string
  user: User
}>
