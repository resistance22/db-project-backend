import { RequestHandler } from "express"
import { Product as ProductEntity } from "@entities/Product.entity"
export { }

declare global {
  declare namespace ProductNS {
    declare namespace DTO {
      interface NewProduct {
        title: string
      }
    }

    declare namespace UseCases {
      interface IAddProduct {
        execute(cosAmountData: ProductNS.DTO.NewProduct, creator_id: number): Promise<ProductEntity>,
      }
    }

    interface getProductsQuery {
      page?: number
      per_page?: number
      sort_by?: string
      sort_order?: sortOrder
    }

    interface IProductRepository {
      insertNewProduct(newProduct: ProductNS.DTO.NewProduct, creator_id: number): Promise<ProductEntity | null>
      getProductsList(query?: getCostQuery): Promise<{
        result: CostEntity[],
        meta: {
          total: number
        }
      }>
      getProductByID(id: number): Promise<ProductEntity | null>
      updateProduct(id: number, product: ProductNS.DTO.NewProduct): Promise<ProductEntity | null>
    }
  }
}