const db = require ("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const products_attribute_valueRoute = require("../routes/products_attribute_value.route")
const apiResponse = require("../helpers/apiResponse.helpers") 



function createProducts_attribute_value(req, res){
    try {
        sqlQuery = 'INSERT INTO products_attribute_value (products_id, attribute_value_id) VALUES (?,?)'
        const {products_id, attribute_value_id} = req.body
        db.query([products_id, attribute_value_id])
      
    
        res.send("work")
      } catch (error) {
        console.error({error:error.message})
      }
}

 async function findAllProducts_attribute_value(req, res){
    try {
        const page = req.query.page
        const limit = req.query.limit
    
    
        const countQuery = "SELECT COUNT(id) FROM products_attribute_value";
        const [[result]] = await db.query(countQuery)
        const totalItems = result["COUNT(id)"]
        const pagination = new Pagination(totalItems, +page, +limit)
      
        const [[products_attribute_value]]=await db.query("SELECT * FROM products_attribute_value LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])
    
     apiResponse(res,201,products_attribute_value,null,pagination)
    } catch (error) {
        console.error({error:error.message});
        console.log(error)
    }
 }

 async function findProducts_attribute_valueById(req, res){
    try {
        const id = req.params.id
        const sqlQuery = "SELECT * FROM products_attribute_value WHERE id =?"
        const [[products_attribute_value]] = await db.query(sqlQuery, id)
        res.json(products_attribute_value)
    } catch (error) {
        res.json({ error: error.message })
        console.log(error)
    }
 }

 async function updateProducts_attribute_value(req, res){
    try {
        const id = req.params.id;
        const selectSql = "SELECT * FROM products_attribute_value WHERE id = ?";
        const products = await db.query(selectSql, id);
        if (products.length === 0) {
          const error = new Error(` this id number under  ${id} info update`);
          error.status = 404;
          throw error;
        }
        const { user_id, product_id, count } = req.body;
        const updateSql = "UPDATE products_attribute_value SET  user_id = ?, product_id = ?, count = ?, WHERE id = ?";
        await db.query(updateSql, [user_id, product_id, count, id]);
        res.send("Information  update");
      } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        console.log(error);
      }
 }


 async function deleteProducts_attribute_value(req, res){
    try {
        const productsId = req.params.id;
        const query = "DELETE FROM products_attribute_value WHERE id =?";
        await db.query(query, [productsId]);
        res.json({ message: "succes delete" });
    
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "not delete " });
    }
 }

 module.exports={
    createProducts_attribute_value,
    findAllProducts_attribute_value,
    findProducts_attribute_valueById,
    updateProducts_attribute_value,
    deleteProducts_attribute_value
 }