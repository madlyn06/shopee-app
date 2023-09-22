import { Purchase, PurchaseStatusParams } from 'src/types/purchase.type'
import { Response } from 'src/types/utill.type'
import http from 'src/utills/http'

const URL = 'purchases'
type TypeBody = { product_id: string; buy_count: number }
export const getPurchases = (params: PurchaseStatusParams) => http.get<Response<Purchase[]>>(URL, { params })
export const addToCart = (body: TypeBody) => http.post<Response<Purchase>>(`${URL}/add-to-cart`, body)
export const updatePurchase = (body: { product_id: string; buy_count: number }) => {
    return http.put<Response<Purchase>>(`${URL}/update-purchase`, body)
  }
export const deletePurchase = (ids: string[]) => http.delete(`${URL}`, { data: ids })
export const buyPurchase = (body: TypeBody[]) => http.post(`${URL}/buy-products`, body)
