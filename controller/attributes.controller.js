const db = require ("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const attributeRoute = require("../routes/attributes.route.js")
const apiResponse = require("../helpers/apiResponse.helpers") 


function createAttribute(req, res){
    try {
        sqlQuery = 'INSERT INTO attributes ( name_uz, name_ru	) VALUES (?,?)'
        const {name_uz, name_ru	} = req.body
        db.query([name_uz, name_ru	])
      
    
        res.send("work")
      } catch (error) {
        console.error({error:error.message})
      }
}

 async function findAllAttribute(req, res){
    try {
        const page = req.query.page
        const limit = req.query.limit
    
    
        const countQuery = "SELECT COUNT(id) FROM attributes";
        const [[result]] = await db.query(countQuery)
        const totalItems = result["COUNT(id)"]
        const pagination = new Pagination(totalItems, +page, +limit)
      
        const [[attributes]]=await db.query("SELECT * FROM attributes LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])
    
     apiResponse(res,201,attributes,null,pagination)
    } catch (error) {
        console.error({error:error.message});
        console.log(error)
    }
 }

 async function findAttributeById(req, res){
    try {
        const id = req.params.id
        const sqlQuery = "SELECT * FROM attributes WHERE id =?"
        const [[attributes]] = await db.query(sqlQuery, id)
        res.json(attributes)
    } catch (error) {
        res.json({ error: error.message })
        console.log(error)
    }
 }

 async function updateAttribute(req, res){
    try {
        const id = req.params.id;
        const selectSql = "SELECT * FROM attributes WHERE id = ?";
        const products = await db.query(selectSql, id);
        if (products.length === 0) {
          const error = new Error(` this id number under  ${id} info update`);
          error.status = 404;
          throw error;
        }
        const { name_uz, name_ru	 } = req.body;
        const updateSql = "UPDATE attributes SET  name_uz = ? name_ru = ?	 WHERE id = ?";
        await db.query(updateSql, [name_uz, name_ru	, id]);
        res.send("Information  update");
      } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        console.log(error);
      }
 }


 async function deleteAttribute(req, res){
    try {
        const productsId = req.params.id;
        const query = "DELETE FROM attributes WHERE id =?";
        await db.query(query, [productsId]);
        res.json({ message: "succes delete" });
    
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "not delete " });
    }
 }

 module.exports={
    createAttribute,
    findAllAttribute,
    findAttributeById,
    updateAttribute,
    deleteAttribute
 }