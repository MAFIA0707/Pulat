const express = require('express')
const attributesRoute = express.Router()
const { createAttributes, findAllAttributes,findAttributesById,updateAttributes,deleteAttributes } = require("../controller/attributes.controller")
const authGuard = require("../middleware/auth.guard")
const roleGuard = require("../middleware/role.guard")


attributesRoute.post("/",authGuard,roleGuard ("user"),createAttributes)
attributesRoute.get("/attribute", findAllAttributes)
attributesRoute.get("/:id", authGuard,roleGuard ("moderator"),findAttributesById)
attributesRoute.patch("/:id",authGuard,roleGuard ("moderator") ,updateAttributes)
attributesRoute.delete("/:id", authGuard,roleGuard ("moderator"),deleteAttributes)

module.exports = attributesRoute