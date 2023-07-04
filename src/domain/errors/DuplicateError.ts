export class DuplicateError extends Error {
    duplicateAttr: string
    constructor(duplicateAttr: string, message: string) {
        super(message)
        this.duplicateAttr = duplicateAttr
        this.name = "DuplicateError"
    }
}