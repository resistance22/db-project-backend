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

  async getProductsList(query?: any) {
    const sort_by = query?.sort_by || "created_at"
    const sort_order = query?.sort_order || "DESC"
    const page = query?.page || 1
    const per_page = query?.per_page || 20
    const offset = (page - 1) * per_page
    const values = [per_page, offset]

    const sql = `SELECT * FROM product ORDER BY ${sort_by} ${sort_order} LIMIT $1 OFFSET $2`
    const countSQL = 'SELECT COUNT(product_code) FROM product'
    const client = await this.connection.connect()
    const res: QueryResult<Cost> = await client.query(sql, values);
    const count: QueryResult<{ count: string }> = await client.query(countSQL)
    await client.release()
    return {
      result: res.rows,
      meta: {
        total: parseInt(count.rows[0].count)
      }
    }
  }

  async getProductByID(id: number): Promise<Product | null> {
    const sql = 'SELECT * FROM product WHERE product_code=$1;'
    const values = [id]
    const client = await this.connection.connect()
    const res: QueryResult<Product> = await client.query(sql, values)
    await client.release()
    if (res.rowCount === 0) {
      return null
    }
    return res.rows[0];
  }

}