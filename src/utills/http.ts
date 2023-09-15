import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import { getAccessTokenFromLS, removeAccessTokenFromLS, saveAccessTokenToLS } from './auth'
class Http {
  instance: AxiosInstance
  private access_token: string
  constructor() {
    this.access_token = getAccessTokenFromLS()
    ;(this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })),
      this.instance.interceptors.request.use(
        (config) => {
          if (this.access_token && config.headers) {
            config.headers.authorization = this.access_token
          }
          return config
        },
        function (error) {
          return Promise.reject(error)
        }
      )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === 'login' || url === 'register') {
          this.access_token = (response.data as AuthResponse).data.access_token
          saveAccessTokenToLS(this.access_token)
        } else if (url === '/logout') {
          this.access_token = ''
          removeAccessTokenFromLS()
          console.log(123)
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.data || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
