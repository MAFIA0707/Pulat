const express = require('express')
const products_eventsRoute = express.Router()
const { createProducts_events, findAllProducts_events,findProducts_eventsById,updateProducts_events,deleteProducts_events } = require("../controller/products_events.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()




products_eventsRoute.post("/",createProducts_events)
products_eventsRoute.get("/", findAllProducts_events)
products_eventsRoute.get("/:id", findProducts_eventsById)
products_eventsRoute.patch("/:id", updateProducts_events)
products_eventsRoute.delete("/:id", deleteProducts_events)

module.exports = products_eventsRoute