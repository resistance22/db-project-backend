import { Client, QueryResult } from 'pg'
import { User } from "@entities/User.entity"
import { hash } from 'bcrypt'

export class UserRepo implements UserNS.IUserRepository {
    connection: Client = new Client()
    async insertNewUser(user: UserNS.DTO.NewUser) {
        const sql = 'INSERT INTO panel_user(role, first_name, last_name, email, phone_number, password) VALUES($1, $2, $3, $4, $5) RETURNING *'
        const hashedPass = await hash(user.password, 10)
        const values = [user.role, user.first_name, user.last_name, user.email, user.phone_number, hashedPass]
        await this.connection.connect()
        const res:QueryResult<User>  = await this.connection.query(sql, values);
        await this.connection.end()
        return res.rows[0];
    }

    async insertRefreshToken(user: User, refresh_token: string){
        const sql = 'INSERT INTO refresh_tokens(user_id, refresh_token) VALUES($1, $2) RETURNING *'
        const values = [user.user_id, refresh_token]
        await this.connection.connect()
        const res:QueryResult<{
            user_id: number,
            refresh_token: string
        }>  = await this.connection.query(sql, values);
        await this.connection.end()
        return res.rows[0];
    }

    async fetchUserByPhoneNumber(phone_number: string){
        const sql = 'SELECT * FROM panel_user WHERE phone_number=$1'
        const values = [phone_number]
        await this.connection.connect()
        const res:QueryResult<User>  = await this.connection.query(sql, values);
        await this.connection.end()
        if(res.rowCount == 0){
            return null
        }
        return res.rows[0];
    } 

    async fetchUserByEmail(email: string){
        const sql = 'SELECT * FROM panel_user WHERE email=$1'
        const values = [email]
        await this.connection.connect()
        const res:QueryResult<User>  = await this.connection.query(sql, values);
        await this.connection.end()
        if(res.rowCount == 0){
            return null
        }
        return res.rows[0];
    } 

    async fetchUserByIdentifier(identifier: string){
        const sql = 'SELECT * FROM panel_user WHERE email=$1 OR phone_number=$1'
        const values = [identifier]
        await this.connection.connect()
        const res:QueryResult<User>  = await this.connection.query(sql, values);
        await this.connection.end()
        if(res.rowCount == 0){
            return null
        }
        return res.rows[0];
    } 

    async fetchUserByID(id: string){
        const sql = 'SELECT * FROM panel_user WHERE user_id=$1'
        const values = [id]
        await this.connection.connect()
        const res:QueryResult<User>  = await this.connection.query(sql, values);
        await this.connection.end()
        if(res.rowCount == 0){
            return null
        }
        return res.rows[0];
    } 
}