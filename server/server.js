import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import UserRouter from "./routes/user.routes.js"
import {dbConnect} from "./config/config.mongoose.js"

const app = express()
app.use(express.json(),cors())
app.use("/user",UserRouter)
dotenv.config()
const PORT=process.env.PORT
dbConnect()



app.listen(PORT,()=>console.log(`Server is listening on port: ${PORT}`))