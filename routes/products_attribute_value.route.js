const express = require('express')
const products_attribute_valueRoute = express.Router()
const { createProducts_attribute_value, findAllProducts_attribute_value,findProducts_attribute_valueById,updateProducts_attribute_value, deleteProducts_attribute_value} = require("../controller/products_attribute_value.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()




products_attribute_valueRoute.post("/",createProducts_attribute_value)
products_attribute_valueRoute.get("/", findAllProducts_attribute_value)
products_attribute_valueRoute.get("/:id", findProducts_attribute_valueById)
products_attribute_valueRoute.patch("/:id", updateProducts_attribute_value)
products_attribute_valueRoute.delete("/:id", deleteProducts_attribute_value)

module.exports = products_attribute_valueRoute