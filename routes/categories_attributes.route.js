const express = require('express')
const cartsRoute = express.Router()
const { createCarts, findAllCarts,findCartsById,updateCarts,deleteCarts} = require("../controller/carts.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()




cartsRoute.post("/",createCarts)
cartsRoute.get("/", findAllCarts)
cartsRoute.get("/:id", findCartsById)
cartsRoute.patch("/:id", updateCarts)
cartsRoute.delete("/:id", deleteCarts)

module.exports = cartsRoute