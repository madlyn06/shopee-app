import { Product } from './product.type'
type PurchaseStatus = -1 | 0 | 1 | 2 | 3 | 4 | 5
/* 
-1: Sản phẩm đang trong giỏ hàng
0: Tất cả sản phâm
1: Sản phẩm đang đợi xác nhận từ chủ shop
2: Sản phẩm đang được lấy hàng
3: Sản phẩm đang vận chuyển
4: San phẩm đã được giao
5: Sản phẩm đã bị hủy
*/
export type PurchaseStatusParams = {
  status: PurchaseStatus
}
export type Purchase = {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchaseStatus
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}
