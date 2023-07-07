import { Pool, QueryResult } from 'pg'
import { User } from "@entities/User.entity"
import { hash } from 'bcrypt'

export class UserRepo implements UserNS.IUserRepository {
    connection: Pool = new Pool()
    async insertNewUser(user: UserNS.DTO.NewUser) {
        const sql = 'INSERT INTO panel_user(role, first_name, last_name, email, phone_number, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
        const hashedPass = await hash(user.password, 10)
        const values = [user.role, user.first_name, user.last_name, user.email, user.phone_number, hashedPass]
        const client = await this.connection.connect()
        try {
            const res: QueryResult<User> = await client.query(sql, values);
            return res.rows[0];
        } catch (e) {
            throw e;
        } finally {
            await client.release()
        }
    }

    async insertRefreshToken(user: User, refresh_token: string) {
        const sql = 'INSERT INTO refresh_tokens(user_id, refresh_token) VALUES($1, $2) RETURNING *'
        const values = [user.user_id, refresh_token]
        const client = await this.connection.connect()
        const res: QueryResult<{
            user_id: number,
            refresh_token: string
        }> = await client.query(sql, values);
        await client.release()
        return res.rows[0];
    }

    async fetchUserByPhoneNumber(phone_number: string) {
        const sql = 'SELECT * FROM panel_user WHERE phone_number=$1'
        const values = [phone_number]
        const client = await this.connection.connect()
        const res: QueryResult<User> = await client.query(sql, values);
        await client.release()
        if (res.rowCount == 0) {
            return null
        }
        return res.rows[0];
    }

    async fetchUserByEmail(email: string) {
        const sql = 'SELECT * FROM panel_user WHERE email=$1'
        const values = [email]
        const client = await this.connection.connect()
        const res: QueryResult<User> = await client.query(sql, values);
        await client.release()
        if (res.rowCount == 0) {
            return null
        }
        return res.rows[0];
    }

    async fetchUserByIdentifier(identifier: string) {
        const sql = 'SELECT * FROM panel_user WHERE email=$1 OR phone_number=$1'
        const values = [identifier]
        const client = await this.connection.connect()

        const res: QueryResult<User> = await client.query(sql, values);
        await client.release()
        if (res.rowCount == 0) {
            return null
        }
        return res.rows[0];
    }

    async fetchUserByID(id: string) {
        const sql = 'SELECT * FROM panel_user WHERE user_id=$1'
        const values = [id]
        const client = await this.connection.connect()
        const res: QueryResult<User> = await client.query(sql, values);
        await client.release()
        if (res.rowCount == 0) {
            return null
        }
        return res.rows[0];
    }

    async getUsersList(query: UserNS.getUsersQuery = {}) {
        const sort_by = query?.sort_by || "created_at"
        const sort_order = query?.sort_order || "DESC"
        const page = query?.page || 1
        const per_page = query?.per_page || 20
        const offset = (page - 1) * per_page
        const values = [per_page, offset]

        const sql = `SELECT * FROM panel_user WHERE role!=1 ORDER BY ${sort_by} ${sort_order} LIMIT $1 OFFSET $2`
        const countSQL = 'SELECT COUNT(user_id) FROM panel_user WHERE role!=1 '
        const client = await this.connection.connect()
        const res: QueryResult<User> = await client.query(sql, values);
        const count: QueryResult<{ count: string }> = await client.query(countSQL)
        await client.release()
        return {
            result: res.rows,
            meta: {
                total: parseInt(count.rows[0].count)
            }
        };
    }
}