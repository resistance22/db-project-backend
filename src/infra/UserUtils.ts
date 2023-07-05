import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserUtils implements UserNS.IUserUtils {
    async makeJWT(user: Omit<UserNS.IUserEntity, "password">, secret: string, expiresIn?: number | undefined) {
        const token = jwt.sign(user, secret)
        return token
    }

    async hasPassword(plainPass: string) {
        const hashedPass = await hash(plainPass, 10)
        return hashedPass
    }

    async checkPassword(encryptedPass: string, plainPass: string) {
        const isOK = await compare(plainPass.trim(), encryptedPass.trim())
        return isOK
    }
}