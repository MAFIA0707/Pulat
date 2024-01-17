const express = require("express");
const addressesRoute = express.Router();
const {
  createAddresses,
  findAllAddresses,
  findAddressesById,
  updateAddresses,
  deleteAddresses,
} = require("../controller/address.controller");
const authGuard = require("../middleware/auth.guard");
const roleGuard = require("../middleware/role.guard");

addressesRoute.post("/", authGuard, roleGuard('user'), createAddresses);
addressesRoute.get("/addresses", findAllAddresses);
addressesRoute.get("/:id", authGuard,roleGuard ('moderator'), findAddressesById);
addressesRoute.patch("/:id", authGuard,roleGuard ('moderator'), updateAddresses);
addressesRoute.delete("/:id", authGuard,roleGuard ('user'), deleteAddresses);

module.exports = addressesRoute;
