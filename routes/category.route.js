const express=require('express')
const { creaateCategory, findAllCategory, findCategoryById, updateCategory, deleteCategory } = require('../controller/category.controller')

const categoryRoute=express.Router()

categoryRoute.post("/",creaateCategory )
categoryRoute.get("/", findAllCategory)
categoryRoute.get("/:id", findCategoryById)
categoryRoute.patch("/:id", updateCategory)
categoryRoute.delete("/:id", deleteCategory)

module.exports=categoryRoute