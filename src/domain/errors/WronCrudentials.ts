export class WrongCrudentialsError extends Error {
    duplicateAttr: string
    constructor(message: string) {
        super(message)
        this.name = "WrongCrudentials"
    }
}