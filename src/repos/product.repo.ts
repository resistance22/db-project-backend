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

  async updateProduct(id: number, product: ProductNS.DTO.NewProduct) {
    const sql = 'UPDATE product SET title=$1 WHERE product_code=$2 RETURNING *'
    const values = [product.title, id]
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

  async addCostTypeToProduct(product_id: number, cost_id: number, creator_id: number, quantity: number) {
    const sql = 'INSERT INTO product_costs(creator_user_id, cost_type_id, product_id, quantity) VALUES($1, $2, $3, $4) RETURNING *;'
    const values = [creator_id, cost_id, product_id, quantity]
    const client = await this.connection.connect()
    try {
      const res: QueryResult = await client.query(sql, values)
      return { success: true };
    } catch (e) {
      return null
    } finally {
      await client.release()
    }
  }

  async getProductCosts(product_id: number) {
    const sql = `SELECT title, quantity, cost_type_id, product_id FROM product_costs 
    INNER JOIN cost_type
    ON product_costs.cost_type_id = cost_type.id
    WHERE product_id=$1`
    const values = [product_id]
    const client = await this.connection.connect()
    const res: QueryResult = await client.query(sql, values)
    await client.release()
    if (res.rowCount === 0) {
      return null
    }
    return res.rows[0];
  }
}