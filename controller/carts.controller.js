const db = require ("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const cartsRoute = require("../routes/carts.route")
const apiResponse = require("../helpers/apiResponse.helpers") 



function createCarts(req, res){
    try {
        sqlQuery = 'INSERT INTO carts (user_id, product_id, count) VALUES (?,?,?)'
        const {user_id, product_id, count} = req.body
        db.query([user_id, product_id, count])
      
    
        res.send("work")
      } catch (error) {
        console.error({error:error.message})
      }
}

 async function findAllCarts(req, res){
    try {
        const page = req.query.page
        const limit = req.query.limit
    
    
        const countQuery = "SELECT COUNT(id) FROM carts";
        const [[result]] = await db.query(countQuery)
        const totalItems = result["COUNT(id)"]
        const pagination = new Pagination(totalItems, +page, +limit)
      
        const [[carts]]=await db.query("SELECT * FROM carts LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])
    
     apiResponse(res,201,carts,null,pagination)
    } catch (error) {
        console.error({error:error.message});
        console.log(error)
    }
 }

 async function findCartsById(req, res){
    try {
        const id = req.params.id
        const sqlQuery = "SELECT * FROM carts WHERE id =?"
        const [[carts]] = await db.query(sqlQuery, id)
        res.json(carts)
    } catch (error) {
        res.json({ error: error.message })
        console.log(error)
    }
 }

 async function updateCarts(req, res){
    try {
        const id = req.params.id;
        const selectSql = "SELECT * FROM carts WHERE id = ?";
        const products = await db.query(selectSql, id);
        if (products.length === 0) {
          const error = new Error(` this id number under  ${id} info update`);
          error.status = 404;
          throw error;
        }
        const { user_id, product_id, count } = req.body;
        const updateSql = "UPDATE carts SET  user_id = ?, product_id = ?, count = ?, WHERE id = ?";
        await db.query(updateSql, [user_id, product_id, count, id]);
        res.send("Information  update");
      } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        console.log(error);
      }
 }


 async function deleteCarts(req, res){
    try {
        const productsId = req.params.id;
        const query = "DELETE FROM carts WHERE id =?";
        await db.query(query, [productsId]);
        res.json({ message: "succes delete" });
    
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "not delete " });
    }
 }

 module.exports={
    createCarts,
    findAllCarts,
    findCartsById,
    updateCarts,
    deleteCarts
 }