import express from "express"
import dotenv from "dotenv"
import env from "./config/env.config.js"
import router from "./routers/routers.js"

dotenv.config()

const app = express()
const PORT  = env.PORT  

app.use(express.json())

app.use("/api",router)

app.listen(PORT, () => {
    console.log(`Server is running - http://localhost:${PORT}/`)
})