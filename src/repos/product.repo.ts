import { Pool, QueryResult } from 'pg'
import { Cost } from "@entities/Cost.entity"
import { Product } from '@/domain/enitity/Product.entity'

export class ProductRepo implements ProductNS.IProductRepository {
  connection: Pool = new Pool()

  async insertNewProduct(newProduct: ProductNS.DTO.NewProduct, creator_id: number) {
    const sql = 'INSERT INTO product(title, creator_user_id) VALUES($1, $2) RETURNING *;'
    const values = [newProduct.title, creator_id]
    const client = await this.connection.connect()
    try {
      const res: QueryResult<Product> = await client.query(sql, values)
      return res.rows[0];
    } catch (e) {
      return null
    } finally {
      await client.release()
    }
  }

}