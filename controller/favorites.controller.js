const db = require("../config/db.config");
const Pagination = require("../helpers/pagiantion");
const favoritesRoute = require("../routes/favorites.route");
const apiResponse = require("../helpers/apiResponse.helpers");



function createFavorites(req, res) {
    try {
      sqlQuery =
        "INSERT INTO favorites (user_id, product_id) VALUES (?,?)";
      const { user_id, product_id} = req.body;
      db.query([user_id, product_id]);
  
      res.send("work");
    } catch (error) {
      console.error({ error: error.message });
    }
  }
  
  async function findAllFavorites(req, res) {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
  
      const countQuery = "SELECT COUNT(id) FROM favorites";
      const [[result]] = await db.query(countQuery);
      const totalItems = result["COUNT(id)"];
      const pagination = new Pagination(totalItems, +page, +limit);
  
      const [[favorites]] = await db.query(
        "SELECT * FROM favorites LIMIT ? OFFSET ? ",
        [pagination.limit, pagination.offset]
      );
  
      apiResponse(res, 201, favorites, null, pagination);
    } catch (error) {
      console.error({ error: error.message });
      console.log(error);
    }
  }
  
  async function findFavoritesById(req, res) {
    try {
      const id = req.params.id;
      const sqlQuery = "SELECT * FROM favorites WHERE id =?";
      const [[favorites]] = await db.query(sqlQuery, id);
      res.json(favorites);
    } catch (error) {
      res.json({ error: error.message });
      console.log(error);
    }
  }
  
  async function updateFovorites(req, res) {
    try {
      const id = req.params.id;
      const selectSql = "SELECT * FROM favorites WHERE id = ?";
      const products = await db.query(selectSql, id);
      if (products.length === 0) {
        const error = new Error(` this id number under  ${id} info update`);
        error.status = 404;
        throw error;
      }
      const {user_id, product_id} = req.body;
      const updateSql =
        "UPDATE favorites SET  user_id = ?, product_id = ?, WHERE id = ?";
      await db.query(updateSql, [user_id, product_id, id]);
      res.send("Information  update");
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
      console.log(error);
    }
  }
  
  async function deleteFavorites(req, res) {
    try {
      const productsId = req.params.id;
      const query = "DELETE FROM favorites WHERE id =?";
      await db.query(query, [productsId]);
      res.json({ message: "succes delete" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "not delete " });
    }
  }
  
  module.exports = {
    createFavorites,
    findAllFavorites,
    findFavoritesById,
    updateFovorites,
    deleteFavorites,
  };
  