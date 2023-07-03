import fs from 'fs'
import path from 'path'
import { Client } from 'pg'

export const generateTables = async () => {
    const sql = fs.readFileSync(`${path.resolve(__dirname, '..')}/src/DDL.sql`).toString()
    const client = new Client()
    await client.connect()
    await client.query(sql);
    await client.end()
}