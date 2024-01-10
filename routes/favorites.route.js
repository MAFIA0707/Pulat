const express = require('express')
const favoritesRoute = express.Router()
const { createFavorites, findAllFavorites,findFavoritesById,updateFovorites,deleteFavorites } = require("../controller/favorites.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()




favoritesRoute.post("/",createFavorites)
favoritesRoute.get("/", findAllFavorites)
favoritesRoute.get("/:id", findFavoritesById)
favoritesRoute.patch("/:id", updateFovorites)
favoritesRoute.delete("/:id", deleteFavorites)

module.exports = favoritesRoute