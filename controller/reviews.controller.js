const db = require("../config/db.config");
const Pagination = require("../helpers/pagiantion");
const reviewsRoute = require("../routes/reviews.route");
const apiResponse = require("../helpers/apiResponse.helpers");



function createReviews(req, res) {
    try {
      sqlQuery =
        "INSERT INTO reviews (user_id, content, image, product_id, rating, answer_to) VALUES (?,?,?,?,?,?)";
      const {user_id, content, image, product_id, rating, answer_to} = req.body;
      db.query([user_id, content, image, product_id, rating, answer_to]);
  
      res.send("work");
    } catch (error) {
      console.error({ error: error.message });
    }
  }
  
  async function findAllReviews(req, res) {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
  
      const countQuery = "SELECT COUNT(id) FROM reviews";
      const [[result]] = await db.query(countQuery);
      const totalItems = result["COUNT(id)"];
      const pagination = new Pagination(totalItems, +page, +limit);
  
      const [[reviews]] = await db.query(
        "SELECT * FROM reviews LIMIT ? OFFSET ? ",
        [pagination.limit, pagination.offset]
      );
  
      apiResponse(res, 201, reviews, null, pagination);
    } catch (error) {
      console.error({ error: error.message });
      console.log(error);
    }
  }
  
  async function findReviewsById(req, res) {
    try {
      const id = req.params.id;
      const sqlQuery = "SELECT * FROM reviews WHERE id =?";
      const [[reviews]] = await db.query(sqlQuery, id);
      res.json(reviews);
    } catch (error) {
      res.json({ error: error.message });
      console.log(error);
    }
  }
  
  async function updateReviews(req, res) {
    try {
      const id = req.params.id;
      const selectSql = "SELECT * FROM reviews WHERE id = ?";
      const products = await db.query(selectSql, id);
      if (products.length === 0) {
        const error = new Error(` this id number under  ${id} info update`);
        error.status = 404;
        throw error;
      }
      const {user_id, content, image, product_id, rating, answer_to} = req.body;
      const updateSql =
        "UPDATE reviews SET user_id = ?, content = ?, image = ?, product_id = ?, rating = ?, answer_to = ?, WHERE id = ?";
      await db.query(updateSql, [user_id, content, image, product_id, rating, answer_to, id]);
      res.send("Information  update");
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
      console.log(error);
    }
  }
  
  async function deleteReviews(req, res) {
    try {
      const productsId = req.params.id;
      const query = "DELETE FROM reviews WHERE id =?";
      await db.query(query, [productsId]);
      res.json({ message: "succes delete" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "not delete " });
    }
  }
  
  module.exports = {
    createReviews,
    findAllReviews,
    findReviewsById,
    updateReviews,
    deleteReviews,
  };
  