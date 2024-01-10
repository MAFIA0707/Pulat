const db = require ("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const productRoute = require("../routes/product.route")
const apiResponse = require("../helpers/apiResponse.helpers") 



async function createProduct(req, res) {
    try {
        sqlQuery = 'INSERT INTO products ( name_uz, name_ru, desc_short_uz, desc_short_ru, desc_uz, desc_ru, images, view_count, orders_count, discount_in_percent, price, remaining_count) VALUES (?,?,?,?,?,?,0,0,0,0,0,0)'
        const {name_uz, name_ru, desc_short_uz, desc_short_ru, desc_uz, desc_ru, images, view_count, orders_count, discount_in_percent, price, remaining_count} = req.body
        db.query(sqlQuery, [name_uz, name_ru, desc_short_uz, desc_short_ru, desc_uz, desc_ru, images, view_count, orders_count, discount_in_percent, price, remaining_count])
      
    
        res.send("work")
      } catch (error) {
        console.error({error:error.message})
      }
}

async function findAllProduct(req, res) {
    try {
        const page = req.query.page
        const limit = req.query.limit
    
    
        const countQuery = "SELECT COUNT(id) FROM products";
        const [[result]] = await db.query(countQuery)
        const totalItems = result["COUNT(id)"]
        const pagination = new Pagination(totalItems, +page, +limit)
      
        const [[products]]=await db.query("SELECT * FROM products LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])
    
     apiResponse(res,201,products,null,pagination)
    } catch (error) {
        console.error({error:error.message});
    }
}
async function findByProduct(req, res) {
    try {
        const id = req.params.id
        const query = "SELECT * FROM products WHERE id =?"
        const [[products]] = await db.query(query, id)
        res.json(products)
    } catch (error) {
        res.json({ error: error.message })
}
}
async function updateProduct(req, res) {
    try {
    const id = req.params.id;
    const selectSql = "SELECT * FROM products WHERE id = ?";
    const products = await db.query(selectSql, id);
    if (products.length === 0) {
      const error = new Error(`product ${id} who does not have a number`);
      error.status = 404;
      throw error
    }
    const { name_uz, name_ru, desc_short_uz, desc_short_ru, desc_uz, desc_ru, images, view_count, orders_count, discount_in_percent, price, remaining_count } = req.body;
    const updateSql = "UPDATE products SET name_uz = ?, name_ru = ?, desc_short_uz = ?, desc_short_ru = ?, desc_uz = ?, desc_ru = ?, images = ?, view_count = ?, orders_count = ?, discount_in_percent = ?, price = ?, remaining_count = ? WHERE id = ?";
    await db.query(updateSql, [name_uz, name_ru, desc_short_uz, desc_short_ru, desc_uz, desc_ru, images, view_count, orders_count, discount_in_percent, price, remaining_count, id]);
    res.send("information change");
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    console.log(error);
  }
}
async function deleteProduct(req, res) {
    try {
        const productsId = req.params.id;
        const query = "DELETE FROM products WHERE id =?";
        await db.query(query, [productsId]);
        res.json({ message: "succes delete" });
    
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "not deleted" });
    }
}
module.exports = {
    createProduct,
    findAllProduct,
    findByProduct,
    updateProduct,
    deleteProduct
}