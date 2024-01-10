const express = require('express')
const deliveryRoute = express.Router()
const { createDelivery, findAllDelivery,findDeliveryById,updateDelivery,deleteDelivery } = require("../controller/delivery.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()




deliveryRoute.post("/",createDelivery)
deliveryRoute.get("/", findAllDelivery)
deliveryRoute.get("/:id", findDeliveryById)
deliveryRoute.patch("/:id", updateDelivery)
deliveryRoute.delete("/:id", deleteDelivery)

module.exports = deliveryRoute