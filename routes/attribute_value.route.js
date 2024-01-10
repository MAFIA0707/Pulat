const express = require('express')
const attribute_valueRoute = express.Router()
const { createAttribute_value, findAllAttribute_value,findAttribute_valueById,updateAttribute_value,deleteAttribute_value } = require("../controller/attribute_value.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()


attribute_valueRoute.post("/",createAttribute_value)
attribute_valueRoute.get("/", findAllAttribute_value)
attribute_valueRoute.get("/:id", findAttribute_valueById)
attribute_valueRoute.patch("/:id", updateAttribute_value)
attribute_valueRoute.delete("/:id", deleteAttribute_value)

module.exports = attribute_valueRoute