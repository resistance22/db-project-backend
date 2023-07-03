export class WronCrudentialsError extends Error {
    duplicateAttr: string
    constructor(message: string) {
        super(message)
        this.name = "WronCrudentials"
    }
}