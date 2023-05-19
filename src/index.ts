import "module-alias/register"
import express from "express"
import { ErrorHandlerMiddleWare } from '@middlewares/ErrorHandler'
import { middlewareFactory } from "@middlewares/index"
import dotenv from "dotenv"

async function main() {
  dotenv.config()
  const port = process.env.PORT
  const app = express()
  const reqLogger = middlewareFactory({
    type: "ReqLogger"
  })
  app.use(express.static("public"))
  app.use(express.json())
  app.use(reqLogger)
  app.use(ErrorHandlerMiddleWare)

  app.get("/", (req, res) => {
    res.send("Hello World From Docker")
  })

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })
}



main()
