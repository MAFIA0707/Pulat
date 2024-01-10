const db = require("../config/db.config");
const Pagination = require("../helpers/pagiantion");
const favoritesRoute = require("../routes/favorites.route");
const apiResponse = require("../helpers/apiResponse.helpers");



function createOrders(req, res) {
    try {
      sqlQuery =
        "INSERT INTO orders (address_id, user_id, product_id, status, count, delivery_id) VALUES (?,?,?,?,?,?)";
      const {address_id, user_id, product_id, status, count, delivery_id} = req.body;
      db.query([address_id, user_id, product_id, status, count, delivery_id]);
  
      res.send("work");
    } catch (error) {
      console.error({ error: error.message });
    }
  }
  
  async function findAllOrders(req, res) {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
  
      const countQuery = "SELECT COUNT(id) FROM orders";
      const [[result]] = await db.query(countQuery);
      const totalItems = result["COUNT(id)"];
      const pagination = new Pagination(totalItems, +page, +limit);
  
      const [[orders]] = await db.query(
        "SELECT * FROM orders LIMIT ? OFFSET ? ",
        [pagination.limit, pagination.offset]
      );
  
      apiResponse(res, 201, orders, null, pagination);
    } catch (error) {
      console.error({ error: error.message });
      console.log(error);
    }
  }
  
  async function findOrdersById(req, res) {
    try {
      const id = req.params.id;
      const sqlQuery = "SELECT * FROM orders WHERE id =?";
      const [[orders]] = await db.query(sqlQuery, id);
      res.json(orders);
    } catch (error) {
      res.json({ error: error.message });
      console.log(error);
    }
  }
  
  async function updateOrders(req, res) {
    try {
      const id = req.params.id;
      const selectSql = "SELECT * FROM orders WHERE id = ?";
      const products = await db.query(selectSql, id);
      if (products.length === 0) {
        const error = new Error(` this id number under  ${id} info update`);
        error.status = 404;
        throw error;
      }
      const {user_id, product_id} = req.body;
      const updateSql =
        "UPDATE orders SET  address_id = ?, user_id = ?, product_id = ?, status = ?, count = ?, delivery_id = ?, WHERE id = ?";
      await db.query(updateSql, [user_id, product_id, id]);
      res.send("Information  update");
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
      console.log(error);
    }
  }
  
  async function deleteOrders(req, res) {
    try {
      const productsId = req.params.id;
      const query = "DELETE FROM orders WHERE id =?";
      await db.query(query, [productsId]);
      res.json({ message: "succes delete" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "not delete " });
    }
  }
  
  module.exports = {
    createOrders,
    findAllOrders,
    findOrdersById,
    updateOrders,
    deleteOrders,
  };
  