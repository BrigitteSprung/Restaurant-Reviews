import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants/route.js"

const app = express()

app.use(cors())
// Server can accept json in the body of the request
app.use(express.json())

app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res) => {
    res.status(404).json({error:"not found"})
})