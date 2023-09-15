import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utills/http'

export const registerApi = (body: { email: string; password: string }) => http.post<AuthResponse>('register', body)
export const loginApi = (body: { email: string; password: string }) => http.post<AuthResponse>('login', body)
export const logoutApi = () => http.post('/logout')
export const logout = () => http.post('/logout')
