export interface ProductListParams {
  page?: 'desc' | 'asc'
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  category?: string
  rating_filter?: number
  price_min?: number
  name?: string
  exclude?: string
}
export interface Product {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  description: string
  category: {
    _id: string
    name: string
  }
  image: string
  createdAt: string
  updatedAt: string
}
export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}
export interface QueryParamsConfig {
  page?: string | number
  limit?: string | number
  order?: 'desc' | 'asc'
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  category?: string | number
  exclude?: string | number
  price_max?: string | number
  price_min?: string | number
  name?: string
  rating_filter?: string | number
}

export interface ProductDetailType {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  category: {
    _id: string
    name: string
  }
  image: string
  createdAt: string
  updatedAt: string
}
