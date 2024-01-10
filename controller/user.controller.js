const db = require("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const user=require("../routes/user.route")


function createUser(req, res) {
    sqlQuery = 'INSERT INTO users (name,last_name,phone,email) VALUES(?,?,?,?)'
    const { name, last_name, phone, email } = req.body
    db.query(sqlQuery, [name, last_name, phone, email])
    res.send("work")
}
async function getUser(req, res) {
    try {
        const page = req.query.page
        const limit = req.query.limit


        const countQuery = "SELECT COUNT(id) FROM users";
        const [[result]] = await db.query(countQuery)
        const totalItems = result["COUNT(id)"]
        const pagination = new Pagination(totalItems, +page, +limit)
      
        const [[users]]=await db.query("SELECT * FROM users LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])

     apiResponse(res,200,users,null,pagination)
    } catch (error) {
        console.error({error:error.message});
    }
}
async function getByUser(req, res) {
    try {
        const id = req.params.id
        const query = "SELECT * FROM users WHERE id = ?"
        const [[user]] = await db.query(query, id)
        res.json(user)
    } catch (error) {
        res.json({ error: error.message })
    }
}
async function updateUser(req, res) {
    try {
        const id = req.params.id
        const query = ("SELECT * FROM users WHERE id = ? ", id)
        const [[user]] = await db.query(query)
        if (!user) {
            const error = new Error(`user with id:${id}not found`)
            error.status = 404
            throw error
        }
        // const {name,lastName,email,phone}=req.body
        const updateSql = "UPDATE users SET ? WHERE id=?"
        await db.query(updateSql, [req.body, id])
        res.send("change")
    } catch (error) {
        res.status(404).json({ error: error.message })

    }
}







async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        const query = "DELETE FROM users WHERE id =?";
        await db.query(query, [userId]);
        res.json({ message: "succes delete" });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "not delete"  });
    }
}
module.exports = {
    createUser,
    getUser,
    getByUser,
    updateUser,
    deleteUser
}



