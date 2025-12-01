import express from "express"
import TemperaturesRoutes from "./routes/temperatures.route.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/", new TemperaturesRoutes().start())

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))