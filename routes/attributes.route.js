const express = require('express')
const attributeRoute = express.Router()
const { createAttribute, findAllAttribute,findAttributeById,updateAttribute,deleteAttribute } = require("../controller/attributes.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()


attributeRoute.post("/",createAttribute)
attributeRoute.get("/", findAllAttribute)
attributeRoute.get("/:id", findAttributeById)
attributeRoute.patch("/:id", updateAttribute)
attributeRoute.delete("/:id", deleteAttribute)

module.exports = attributeRoute