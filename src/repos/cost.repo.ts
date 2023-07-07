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

  async getCostByTitle(title: string) {
    const sql = 'SELECT * FROM cost_type WHERE title=$1;'
    const values = [title]
    const client = await this.connection.connect()
    const res: QueryResult<Cost> = await client.query(sql, values)
    await client.release()
    if (res.rowCount === 0) {
      return null
    }
    return res.rows[0];
  }
}