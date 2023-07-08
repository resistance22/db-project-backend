import { Pool, QueryResult } from 'pg'
import { hash } from 'bcrypt'
import { CostAmount as CostAmountEntity } from '@/domain/enitity/CostAmount.entity'

export class CostRepo implements CostAmountNS.ICostAmountRepository {
  connection: Pool = new Pool()

  async insertNewCostAmount(cost: CostAmountNS.DTO.NewCostAmount, creator_id: number, cost_id: any): Promise<CostAmountEntity | null> {
    const sql = 'INSERT INTO cost_amount(creator_user_id, unit_price, cost_id) VALUES($1, $2, $3) RETURNING *'
    const values = [creator_id, cost.unit_price, cost.cost_id]
    const client = await this.connection.connect()
    try {
      const res: QueryResult<CostAmountEntity> = await client.query(sql, values)
      return res.rows[0];
    } catch (e) {
      return null
    } finally {
      await client.release()
    }

  }

}