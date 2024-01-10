const db = require("../config/db.config")

async function creaateCategory(req,res){
  try {
    const {name_uz, name_ru, desc_short_uz, desc_short_ru, images, parent_id} = req.body

    await db.query('INSERT  INTO categories (name_uz, name_ru, desc_short_uz, desc_short_ru, images, view_count, parent_id) VALUES (?,?,?,?,?,0,?)', [name_uz, name_ru, desc_short_uz, desc_short_ru, images,parent_id])
    res.send("created");
}
  catch (error) {
    res.send(error.message)
  }
}
async function findAllCategory(req,res){
  try {
    const page = req.query.page
    const limit = req.query.limit


    const countQuery = "SELECT COUNT(id) FROM categories";
    const [[result]] = await db.query(countQuery)
    const totalItems = result["COUNT(id)"]
    const pagination = new Pagination(totalItems, +page, +limit)
  
    const [[categories]]=await db.query("SELECT * FROM categories LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])

 apiResponse(res,200,categories,null,pagination)
} catch (error) {
    console.error({error:error.message});
}
}
async function findCategoryById(req,res){
  try {
    const id = req.params.id
    const query = "SELECT * FROM categories WHERE id =?"
    const [[categories ]] = await db.query(query, id)
    res.json(categories )
} catch (error) {
    res.json({ error: error.message })
}
}
async function updateCategory(req,res){
  try{
    const id = req.params.id;
    const selectSql = "SELECT * FROM categories  WHERE id = ?";
    const products = await db.query(selectSql, id);
    if (products.length === 0) {
      const error = new Error(`Mahsulot ${id} raqamiga ega bo'lmagan`);
      error.status = 404;
      throw error;
    }
    const { name_uz, name_ru, desc_short_uz, desc_short_ru, desc_uz, desc_ru, images, view_count, parent_id  } = req.body;
    const updateSql = "UPDATE categories SET name_uz = ?, name_ru = ?, desc_short_uz = ?, desc_short_ru = ?, images = ?, view_count = ?, parent_id = ? WHERE id = ?";
    await db.query(updateSql, [name_uz, name_ru, desc_short_uz, desc_short_ru, desc_uz, desc_ru, images, view_count, parent_id, id]);
    res.send("Ma'lumotlar o'zgartirildi");
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    console.log(error);
  }
}
async function deleteCategory(req,res){

}


module.exports = {
creaateCategory,
findAllCategory,
findCategoryById,
updateCategory,
deleteCategory
}
