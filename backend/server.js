import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants/route.js"

const app = express()

app.use(cors())
// Server can accept json in the body of the request
app.use(express.json())