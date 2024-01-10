const db = require ("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const deliveryRoute = require("../routes/delivery.route")
const apiResponse = require("../helpers/apiResponse.helpers") 



function createDelivery(req, res){
    try {
        sqlQuery = 'INSERT INTO delivery (deliver_id, note, delivery_fee) VALUES (?,?,?)'
        const {deliver_id, note, delivery_fee} = req.body
        db.query([deliver_id, note, delivery_fee	])
      
    
        res.send("work")
      } catch (error) {
        console.error({error:error.message})
      }
}

 async function findAllDelivery(req, res){
    try {
        const page = req.query.page
        const limit = req.query.limit
    
    
        const countQuery = "SELECT COUNT(id) FROM delivery";
        const [[result]] = await db.query(countQuery)
        const totalItems = result["COUNT(id)"]
        const pagination = new Pagination(totalItems, +page, +limit)
      
        const [[delivery]]=await db.query("SELECT * FROM delivery LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])
    
     apiResponse(res,201,delivery,null,pagination)
    } catch (error) {
        console.error({error:error.message});
        console.log(error)
    }
 }

 async function findDeliveryById(req, res){
    try {
        const id = req.params.id
        const sqlQuery = "SELECT * FROM delivery WHERE id =?"
        const [[delivery]] = await db.query(sqlQuery, id)
        res.json(delivery)
    } catch (error) {
        res.json({ error: error.message })
        console.log(error)
    }
 }

 async function updateDelivery(req, res){
    try {
        const id = req.params.id;
        const selectSql = "SELECT * FROM delivery WHERE id = ?";
        const products = await db.query(selectSql, id);
        if (products.length === 0) {
          const error = new Error(` this id number under  ${id} info update`);
          error.status = 404;
          throw error;
        }
        const { deliver_id, note, delivery_fee } = req.body;
        const updateSql = "UPDATE delivery SET  deliver_id = ?, note = ?, delivery_fee = ? WHERE id = ?";
        await db.query(updateSql, [deliver_id, note, delivery_fee, id]);
        res.send("Information  update");
      } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        console.log(error);
      }
 }


 async function deleteDelivery(req, res){
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
    createDelivery,
    findAllDelivery,
    findDeliveryById,
    updateDelivery,
    deleteDelivery
 }