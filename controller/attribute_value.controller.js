const db = require ("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const attribute_valueRoute = require("../routes/attribute_value.route")
const apiResponse = require("../helpers/apiResponse.helpers") 


function createAttribute_value(req, res){
    try {
        sqlQuery = 'INSERT INTO attributes_value ( name_uz, name_ru, attribute_id) VALUES (?,?)'
        const {name_uz, name_ru, attribute_id } = req.body
        db.query([name_uz, name_ru, attribute_id])
      
    
        res.send("work")
      } catch (error) {
        console.error({error:error.message})
      }
}

 async function findAllAttribute_value(req, res){
    try {
        const page = req.query.page
        const limit = req.query.limit
    
    
        const countQuery = "SELECT COUNT(id) FROM attributes_value";
        const [[result]] = await db.query(countQuery)
        const totalItems = result["COUNT(id)"]
        const pagination = new Pagination(totalItems, +page, +limit)
      
        const [[attributes_value]]=await db.query("SELECT * FROM attributes_value LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])
    
     apiResponse(res,201,attributes_value,null,pagination)
    } catch (error) {
        console.error({error:error.message});
        console.log(error)
    }
 }

 async function findAttribute_valueById(req, res){
    try {
        const id = req.params.id
        const sqlQuery = "SELECT * FROM attributes_value WHERE id =?"
        const [[attributes_value]] = await db.query(sqlQuery, id)
        res.json(attributes_value)
    } catch (error) {
        res.json({ error: error.message })
        console.log(error)
    }
 }

 async function updateAttribute_value(req, res){
    try {
        const id = req.params.id;
        const selectSql = "SELECT * FROM attributes_value WHERE id = ?";
        const products = await db.query(selectSql, id);
        if (products.length === 0) {
          const error = new Error(` this id number under  ${id} info update`);
          error.status = 404;
          throw error;
        }
        const {name_uz, name_ru, attribute_id} = req.body;
        const updateSql = "UPDATE attributes_value SET  name_uz = ? name_ru = ?	 WHERE id = ?";
        await db.query(updateSql, [name_uz, name_ru, attribute_id, id]);
        res.send("Information  update");
      } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        console.log(error);
      }
 }


 async function deleteAttribute_value(req, res){
    try {
        const productsId = req.params.id;
        const query = "DELETE FROM attributes_value WHERE id =?";
        await db.query(query, [productsId]);
        res.json({ message: "succes delete" });
    
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "not delete " });
    }
 }

 module.exports={
    createAttribute_value,
    findAllAttribute_value,
    findAttribute_valueById,
    updateAttribute_value,
    deleteAttribute_value
 }