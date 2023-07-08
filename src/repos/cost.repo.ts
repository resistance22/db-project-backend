import { Pool, QueryResult } from 'pg'
import { Cost } from "@entities/Cost.entity"
import { hash } from 'bcrypt'

export class CostRepo implements CostNS.ICostRepository {
  connection: Pool = new Pool()

  async getCostByID(id: number) {
    const sql = 'SELECT * FROM cost_type WHERE id=$1;'
    const values = [id]
    const client = await this.connection.connect()
    const res: QueryResult<Cost> = await client.query(sql, values)
    await client.release()
    if (res.rowCount === 0) {
      return null
    }
    return res.rows[0];
  }

  async deleteCost(id: number): Promise<Cost | null> {
    const sql = 'DELETE FROM cost_type WHERE id=$1 RETURNING *'
    const values = [id]
    const client = await this.connection.connect()
    const res: QueryResult<Cost> = await client.query(sql, values)
    await client.release()
    if (res.rowCount === 0) {
      return null
    }
    return res.rows[0];
  }

  async insertNewCost(cost: CostNS.DTO.NewCost, creator_id: number) {
    const sql = 'INSERT INTO cost_type(creator_user_id, title) VALUES($1, $2) RETURNING *;'
    const values = [creator_id, cost.title]
    const client = await this.connection.connect()
    try {
      const res: QueryResult<Cost> = await client.query(sql, values)
      return res.rows[0];
    } catch (e) {
      return null
    } finally {
      await client.release()
    }
  }

  async updateCost(id: number, cost: CostNS.DTO.NewCost): Promise<Cost | null> {
    const sql = 'UPDATE cost_type SET title=$1 WHERE id=$2 RETURNING *'
    const values = [cost.title, id]
    const client = await this.connection.connect()
    try {
      const res: QueryResult<Cost> = await client.query(sql, values)
      return res.rows[0];
    } catch (e) {
      return null
    } finally {
      await client.release()
    }
  }

  async getCostByTitle(title: string) {
    const sql = 'SELECT * FROM cost_type WHERE title=$1;'
    const values = [title]
    const client = await this.connection.connect()
    try {
      const res: QueryResult<Cost> = await client.query(sql, values)
      return res.rows[0];
    } catch (e) {
      console.log(e)
      return null
    } finally {
      await client.release()
    }
  }

  async getCostList(query: CostNS.getCostQuery = {}) {
    const sort_by = query?.sort_by || "created_at"
    const sort_order = query?.sort_order || "DESC"
    const page = query?.page || 1
    const per_page = query?.per_page || 20
    const offset = (page - 1) * per_page
    const values = [per_page, offset]

    const sql = `SELECT * FROM cost_type ORDER BY ${sort_by} ${sort_order} LIMIT $1 OFFSET $2`
    const countSQL = 'SELECT COUNT(id) FROM cost_type'
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
}