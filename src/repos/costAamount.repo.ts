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

}