import { CategoryType } from 'src/types/category.type'
import { Product, ProductList, ProductListParams } from 'src/types/product.type'
import { Response } from 'src/types/utill.type'
import http from 'src/utills/http'
const URL = 'products'
export const getProducts = (params: ProductListParams) => http.get<Response<ProductList>>(URL, { params })
export const getProductDetail = (id: string) => http.get<Response<Product>>(`${URL}/${id}`)
export const getCategories = () => http.get<Response<CategoryType[]>>('categories')
