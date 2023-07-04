import { ROLES } from './Enums'
import { hash } from 'bcrypt'
import fs from 'fs'
import path from 'path'
import { Client } from 'pg'

export const generateTables = async () => {
    const sql = fs.readFileSync(`${path.resolve(__dirname, '..')}/src/DDL.sql`).toString()
    const client = new Client()
    await client.connect()
    await client.query(sql);
    const count = await client.query('SELECT COUNT(user_id) FROM panel_user')
    if (count.rows[0].count == 0) {
        const hashedPass = await hash(process.env.ADMIN_PASSWORD as string, 10)
        const values = [ROLES.ADMIN, process.env.ADMIN_FIRST_NAME, process.env.ADMIN_LAST_NAME, process.env.ADMIN_EMAIL, process.env.ADMIN_PHONE_NUMBER, hashedPass]
        await client.query('INSERT INTO panel_user(role, first_name, last_name, email, phone_number, password) VALUES($1, $2, $3, $4, $5, $6);', values)
    }
    await client.end()
}