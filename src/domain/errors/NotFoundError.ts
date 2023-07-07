export class NotFoundError extends Error {
  duplicateAttr: string
  constructor(message: string) {
    super(message)
    this.name = "NotFoundError"
  }
}