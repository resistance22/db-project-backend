import { DuplicateError } from "@errors/DuplicateError"

export class UserRegister implements UserNS.UseCases.IUserRegister {
    userRepo: UserNS.IUserRepository
    userUtils: UserNS.IUserUtils
    constructor(userRepo: UserNS.IUserRepository, userUtils: UserNS.IUserUtils) {
        this.userRepo = userRepo
        this.userUtils = userUtils
    }
    async execute(userData: UserNS.DTO.NewUser) {
        const foundUserByPhone = await this.userRepo.fetchUserByPhoneNumber(userData.phone_number)
        if (foundUserByPhone != null) {
            throw new DuplicateError("phone_number", "This Phone Number alreadey exists")
        }
        const foundUserByEmail = await this.userRepo.fetchUserByPhoneNumber(userData.email)
        if (foundUserByEmail != null) {
            throw new DuplicateError("email", "This Email alreadey exists")
        }
        const res = await this.userRepo.insertNewUser(userData)
        return res
    }
}