const db = require ("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const addressRoute = require("../routes/product.route.js")
const apiResponse = require("../helpers/apiResponse.helpers") 





function createAddress(req, res){
    try {
        sqlQuery = 'INSERT INTO address ( region, city, street, house,	room, name) VALUES (?,?,?,?,?,?)'
        const {region, city, street, house,	room, name} = req.body
        db.query([region, city, street, house,	room, name])
      
    
        res.send("work")
      } catch (error) {
        console.error({error:error.message})
      }
}

 async function findAllAddress(req, res){
    try {
        const page = req.query.page
        const limit = req.query.limit
    
    
        const countQuery = "SELECT COUNT(id) FROM addresses";
        const [[result]] = await db.query(countQuery)
        const totalItems = result["COUNT(id)"]
        const pagination = new Pagination(totalItems, +page, +limit)
      
        const [[addresses]]=await db.query("SELECT * FROM addresses LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])
    
     apiResponse(res,201,addresses,null,pagination)
    } catch (error) {
        console.error({error:error.message});
        console.log(error)
    }
 }

 async function findAddressById(req, res){
    try {
        const id = req.params.id
        const sqlQuery = "SELECT * FROM addresses WHERE id =?"
        const [[addresses]] = await db.query(sqlQuery, id)
        res.json(addresses)
    } catch (error) {
        res.json({ error: error.message })
        console.log(error)
    }
 }

 async function updateAddress(req, res){
    try {
        const id = req.params.id;
        const selectSql = "SELECT * FROM addresses WHERE id = ?";
        const products = await db.query(selectSql, id);
        if (products.length === 0) {
          const error = new Error(` this id number under  ${id} info update`);
          error.status = 404;
          throw error;
        }
        const { region,city,street,house,room,name } = req.body;
        const updateSql = "UPDATE addresses SET region = ?, city = ?, street = ?, house = ?, room = ?, name = ? WHERE id = ?";
        await db.query(updateSql, [region,city,street,house,room,name, id]);
        res.send("Information  update");
      } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        console.log(error);
      }
 }


 async function deleteAddress(req, res){
    try {
        const productsId = req.params.id;
        const query = "DELETE FROM addresses WHERE id =?";
        await db.query(query, [productsId]);
        res.json({ message: "succes delete" });
    
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "not delete " });
    }
 }

 module.exports={
    createAddress,
    findAllAddress,
    findAddressById,
    updateAddress,
    deleteAddress
 }