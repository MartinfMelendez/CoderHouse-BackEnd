import express from "express"
import dotenv from "dotenv"
import env from "./config/env.config.js"
import { getAllService, getServiceById, addService, updateService, deleteService } from "./managers/ServiceManager.js"

dotenv.config()
const app = express()
const port = env.PORT

app.use(express.json())

app.get("/api/services", (req, res) => {
    const services = getAllService()
    res.status(200).json({ Services: services })
})

app.get("/api/services/:id", (req, res) => {
    const { id } = req.params
    const service = getServiceById(id)
    res.status(200).json({ Service: service })
})

app.post("/api/services", (req, res) => {
    const { name, description, duration, price, category, available } = req.body
    const newService = addService(name, description, duration, price, category, available)
    res.status(201).json({ NewService: newService })
})

app.put("/api/services/:id", (req, res) => {
    const { id } = req.params
    const { name, description, duration, price, category, available } = req.body
    const updatedService = updateService(id, name, description, duration, price, category, available)
    res.status(200).json({ UpdatedService: updatedService })
})

app.delete("/api/services/:id", (req, res) => {
    const { id } = req.params
    const deleteservice = deleteService(id)
    res.status(200).json({ DeletedService: deleteservice })
})

app.listen(port, () => {
    console.log(`Server is running - http://localhost:${port}/`)
})