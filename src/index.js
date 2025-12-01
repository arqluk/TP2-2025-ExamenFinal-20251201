import express from "express"
import RunnersRoutes from "./routes/runners.route.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/", new RunnersRoutes().start())

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))