import { Pool, QueryResult } from 'pg'
import { hash } from 'bcrypt'
import { CostAmount } from '@/domain/enitity/CostAmount.entity'

export class CostAmountRepo implements CostAmountNS.ICostAmountRepository {
  connection: Pool = new Pool()

  async insertNewCostAmount(cost: CostAmountNS.DTO.NewCostAmount, creator_id: number, cost_id: any): Promise<CostAmount | null> {
    const sql = 'INSERT INTO cost_amount(creator_user_id, unit_price, cost_type_id) VALUES($1, $2, $3) RETURNING *'
    const values = [creator_id, cost.unit_price, cost_id]
    const client = await this.connection.connect()
    try {
      const res: QueryResult<CostAmount> = await client.query(sql, values)
      return res.rows[0];
    } catch (e) {
      console.log(e)
      return null
    } finally {
      await client.release()
    }

  }

  async getCostAmountByID(cost_id: any): Promise<CostAmount | null> {
    const sql = 'SELECT * FROM cost_amount WHERE id=$1;'
    const values = [cost_id]
    const client = await this.connection.connect()
    try {
      const res: QueryResult<CostAmount> = await client.query(sql, values)
      if (res.rowCount === 0) {
        return null
      }
      return res.rows[0];
    } catch (e) {
      return null
    } finally {
      await client.release()
    }
  }

  async getCostAmountListByCostID(cost_id: number, query: CostAmountNS.getCostAmountQuery = {}) {
    const sort_by = query?.sort_by || "created_at"
    const sort_order = query?.sort_order || "DESC"
    const page = query?.page || 1
    const per_page = query?.per_page || 20
    const offset = (page - 1) * per_page
    const queryVals = [per_page, offset]

    const sql = `SELECT * FROM cost_amount WHERE cost_type_id=$1 ORDER BY ${sort_by} ${sort_order} LIMIT $2 OFFSET $3`
    const countSQL = 'SELECT COUNT(id) FROM cost_amount WHERE cost_type_id=$1'
    const values = [cost_id]
    const client = await this.connection.connect()
    try {
      const res: QueryResult<CostAmount> = await client.query(sql, [...values, ...queryVals])
      const count: QueryResult<{ count: string }> = await client.query(countSQL, values)

      return {
        result: res.rows,
        meta: {
          total: parseInt(count.rows[0].count)
        }
      };
    } catch (e) {
      console.log(e)
      return null
    } finally {
      await client.release()
    }
  }

}