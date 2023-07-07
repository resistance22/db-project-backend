import { User } from "@infra/DB/entities/User.entity"
import { RequestHandler } from "express"
import { Repository } from "typeorm"
import { User as UserEntitiy } from "@entities/User.entity"
export { }

declare global {
  declare namespace UserNS {
    declare namespace DTO {
      interface NewUser {
        role: number
        first_name: string
        last_name: string
        email: string
        phone_number: string
        password: string
      }
      interface IUser extends NewUser {
        id: string
        created_at: string
        updated_at: string
      }
    }

    declare namespace UseCases {
      interface IUserRegister {
        execute(userData: UserNS.DTO.NewUser): Promise<UserEntitiy>,
      }

      interface IUserSignIn {
        execute: (userData: { identifier: string, password: string }) => Promise<{
          user: Omit<UserEntitiy, "password">,
          tokens: {
            accessToken: string,
            refreshToken: string
          }
        }>
      }
    }

    declare namespace Controllers {
      type register = (usecase: UseCases.IUserRegister) => IRoute
    }



    interface getUsersQuery {
      page?: number
      per_page?: number
      sort_by?: string
      sort_order?: sortOrder
    }

    interface IUserRepository {
      insertNewUser(user: UserNS.DTO.NewUser): Promise<UserEntitiy>
      fetchUserByPhoneNumber: (phone_number: string) => Promise<UserEntitiy | null>
      fetchUserByEmail: (email: string) => Promise<UserEntitiy | null>
      fetchUserByIdentifier: (identifier: string) => Promise<UserEntitiy | null>
      fetchUserByID: (id: string) => Promise<UserEntitiy | null>
      insertRefreshToken(user: UserEntitiy, refresh_token: string): void
      getUsersList(query?: getUsersQuery): Promise<{
        result: UserEntitiy[],
        meta: {
          total: number
        }
      }>
    }

    interface IUserEntity extends UserEntitiy { }

    interface IUserUtils {
      hasPassword(plainPass: string): Promise<string>
      checkPassword: (encryptedPass: string, plainPass: string) => Promise<boolean>
      makeJWT(user: Omit<IUserEntity, "password">, secret: string, expiresIn?: number): Promise<string>
    }

    interface EmailServices {
      sendEmailConfirmationCode: (user: UserEntitiy, code: string) => Promise<void>
    }

  }
}