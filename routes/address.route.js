const express = require('express')
const addressRoute = express.Router()
const { createAddress, findAllAddress,findAddressById,updateAddress,deleteAddress } = require("../controller/address.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()


addressRoute.post("/",createAddress)
addressRoute.get("/", findAllAddress)
addressRoute.get("/:id", findAddressById)
addressRoute.patch("/:id", updateAddress)
addressRoute.delete("/:id", deleteAddress)

module.exports=addressRoute