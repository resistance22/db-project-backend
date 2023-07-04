import { WrongCrudentialsError } from "../../errors/WronCrudentials"

export class UserSignIn implements UserNS.UseCases.IUserSignIn {
    userRepo: UserNS.IUserRepository
    userUtils: UserNS.IUserUtils
    constructor(userRepo: UserNS.IUserRepository, userUtils: UserNS.IUserUtils) {
        this.userRepo = userRepo
        this.userUtils = userUtils
    }

    async execute({ identifier, password }: { identifier: string, password: string }) {
        const foundUser = await this.userRepo.fetchUserByIdentifier(identifier)
        if (foundUser === null) {
            throw new WrongCrudentialsError("Wrong Crudentials")
        }

        const isPasswordOK = await this.userUtils.checkPassword(foundUser.password, password)

        if (!isPasswordOK) {
            throw new WrongCrudentialsError("Wrong Crudentials")
        }

        const { password: _, ...usrWithoutPass } = foundUser
        const accessToken = await this.userUtils.makeJWT(usrWithoutPass, process.env.ACCESS_TOKEN_SECRET as string)
        const refreshToken = await this.userUtils.makeJWT(usrWithoutPass, process.env.REFRESH_TOKEN_SECRET as string)

        // for later refreshToken functionality
        // this.userRepo.insertRefreshToken(foundUser, refreshToken)

        return {
            accessToken,
            refreshToken
        }
    }
}