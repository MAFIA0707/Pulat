const db = require("../config/db.config");
const Pagination = require("../helpers/pagiantion");
const products_eventsRoute = require("../routes/products_events.route");
const apiResponse = require("../helpers/apiResponse.helpers");



function createProducts_events(req, res) {
    try {
      sqlQuery =
        "INSERT INTO products_events (products_id, events_id) VALUES (?,?)";
      const {products_id, events_id} = req.body;
      db.query([products_id, events_id]);
  
      res.send("work");
    } catch (error) {
      console.error({ error: error.message });
    }
  }
  
  async function findAllProducts_events(req, res) {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
  
      const countQuery = "SELECT COUNT(id) FROM products_events";
      const [[result]] = await db.query(countQuery);
      const totalItems = result["COUNT(id)"];
      const pagination = new Pagination(totalItems, +page, +limit);
  
      const [[products_events]] = await db.query(
        "SELECT * FROM products_events LIMIT ? OFFSET ? ",
        [pagination.limit, pagination.offset]
      );
  
      apiResponse(res, 201, products_events, null, pagination);
    } catch (error) {
      console.error({ error: error.message });
      console.log(error);
    }
  }
  
  async function findProducts_eventsById(req, res) {
    try {
      const id = req.params.id;
      const sqlQuery = "SELECT * FROM products_events WHERE id =?";
      const [[products_events]] = await db.query(sqlQuery, id);
      res.json(products_events);
    } catch (error) {
      res.json({ error: error.message });
      console.log(error);
    }
  }
  
  async function updateProducts_events(req, res) {
    try {
      const id = req.params.id;
      const selectSql = "SELECT * FROM products_events WHERE id = ?";
      const products = await db.query(selectSql, id);
      if (products.length === 0) {
        const error = new Error(` this id number under  ${id} info update`);
        error.status = 404;
        throw error;
      }
      const {products_id, events_id} = req.body;
      const updateSql =
        "UPDATE products_events SET  products_id = ?, events_id = ?, WHERE id = ?";
      await db.query(updateSql, [products_id, events_id, id]);
      res.send("Information  update");
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
      console.log(error);
    }
  }
  
  async function deleteProducts_events(req, res) {
    try {
      const productsId = req.params.id;
      const query = "DELETE FROM products_events WHERE id =?";
      await db.query(query, [productsId]);
      res.json({ message: "succes delete" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "not delete " });
    }
  }
  
  module.exports = {
    createProducts_events,
    findAllProducts_events,
    findProducts_eventsById,
    updateProducts_events,
    deleteProducts_events,
  };
  