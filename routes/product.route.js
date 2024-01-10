const express = require('express')
const productRoute = express.Router()
const { createProduct, findAllProduct, findByProduct, updateProduct, deleteProduct } = require("../controller/product.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()


productRoute.use(authGuard)
const roleGuard = require("../middleware/role.guard")


productRoute.post("/",authGuard, roleGuard("moderator"), createProduct)
productRoute.get("/product", findAllProduct)
productRoute.get("/:id",authGuard,roleGuard("moderator"), findByProduct)
productRoute.patch("/:id",authGuard,roleGuard("moderator"), updateProduct)
productRoute.delete("/:id",authGuard, roleGuard("moderator"), deleteProduct)
module.exports = productRoute



















//productRoute.post('/', (req, res) => {
//    //console.log('post zapros ishladi');
//    const body = req.body
//   // console.log('body ishladi', body)
//    res.send(body)
//})
////productRoute.get('/', (req, res) => {
////   // res.send({ url: req.originalUrl, method: req.method })
////   const query=req.query
////   res.json(query)
////})
////productRoute.get('/:id', (req, res) => {
//  // const params=req.params
//  // return res.send("id:")
//  //res.json(req.originalUrl)
//  //
//   
////})
//productRoute.get('/:id', (req, res) => {
//    const params=req.params
//   res.json(params)
//  
//   
//})
//productRoute.patch('/:id', (req, res) => {
//    const params=req.params
//    const body=req.body
//     const obj={params,body}
//     res.send(obj)
//  
//   
//})
//productRoute.delete('/:id', (req, res) => {
//    const body=req.body
//    res.send(body)
//})

