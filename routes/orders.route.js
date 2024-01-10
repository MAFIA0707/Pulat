const express = require('express')
const ordersRoute = express.Router()
const { createOrders, findAllOrders,findOrdersById,updateOrders,deleteOrders } = require("../controller/orders.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()




ordersRoute.post("/",createOrders)
ordersRoute.get("/", findAllOrders)
ordersRoute.get("/:id", findOrdersById)
ordersRoute.patch("/:id", updateOrders)
ordersRoute.delete("/:id", deleteOrders)

module.exports = ordersRoute