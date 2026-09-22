import {Router} from "express"
import { getAllService, getServiceById, addService, updateService, deleteService } from "../managers/ServiceManager.js"

const routerService = Router()

routerService.get("/", (req, res) => {
    const {category, available} = req.query
    if(category && available){
        
    }
    const services = getAllService()
    res.status(200).json({ Services: services })
})

routerService.get("/:id", (req, res) => {
    const { id } = req.params
    const service = getServiceById(id)
    res.status(200).json({ Service: service })
})

routerService.post("/", (req, res) => {
    const { name, description, duration, price, category, available } = req.body
    const newService = addService(name, description, duration, price, category, available)
    res.status(201).json({ NewService: newService })
})

routerService.put("/:id", (req, res) => {
    const { id } = req.params
    const data = {...req.body}
    const updatedService = updateService(id, data)
    res.status(200).json({ UpdatedService: updatedService })
})

routerService.delete("/:id", (req, res) => {
    const { id } = req.params 
    const deleteservice = deleteService(id)
    res.status(200).json({ DeletedService: deleteservice })
})

export default routerService