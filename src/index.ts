import "module-alias/register"
import express from "express"
import { ErrorHandlerMiddleWare } from '@middlewares/ErrorHandler'
import { middlewareFactory } from "@middlewares/index"
import { authRouter } from "@routes/auth/index"
import { generateTables } from "./utils"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from "dotenv"

async function main() {
  dotenv.config()
  const port = process.env.SERVER_PORT
  const app = express()
  const reqLogger = middlewareFactory({
    type: "ReqLogger"
  })
  app.use(express.static("public"))
  app.use(express.json())
  app.use(cookieParser())
  app.use(cors())
  app.use(reqLogger)


  app.use("/", authRouter)

  app.use(ErrorHandlerMiddleWare)


  await generateTables()

  app.get("/", (req, res) => {
    res.send("Hello World From Docker")
  })

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })
}



main()
