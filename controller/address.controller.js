const db = require("../config/db.config");
const Pagination = require("../helpers/pagiantion");
const apiResponse = require("../helpers/apiResponse.helpers");

function createAddresses(req, res) {
  try {
    console.log("okk");
    const sqlQuery =
      "INSERT INTO addresses( region, city, street, house,	room, name, user_id) VALUES (?,?,?,?,?,?,?)";
    const { region, city, street, house, room, name, user_id } = req.body;
    db.query(sqlQuery, [region, city, street, house, room, name, user_id]);

    res.send("work");
  } catch (error) {
    console.error({ error: error.message });
  }
}

async function findAllAddresses(req, res) {
  try {
    const page = req.query.page;
    const limit = req.query.limit;

    const countQuery = "SELECT COUNT(id) FROM addresses";
    const [[result]] = await db.query(countQuery);
    const totalItems = result["COUNT(id)"];
    const pagination = new Pagination(totalItems, +page, +limit);

    const [[addresses]] = await db.query(
      "SELECT * FROM addresses LIMIT ? OFFSET ? ",
      [pagination.limit, pagination.offset]
    );

    apiResponse(res, 201, addresses, null, pagination);
  } catch (error) {
    console.error({ error: error.message });
    console.log(error);
  }
}

async function findAddressesById(req, res) {
  try {
    const id = req.params.id;
    const sqlQuery = "SELECT * FROM addresses WHERE id =?";
    const [[addresses]] = await db.query(sqlQuery, id);
    res.json(addresses);
  } catch (error) {
    res.json({ error: error.message });
    console.log(error);
  }
}

async function updateAddresses(req, res) {
  try {
    const id = req.params.id;
    const selectSql = "SELECT * FROM addresses WHERE id = ?";
    const addresses = await db.query(selectSql, id);
    if (addresses.length === 0) {
      const error = new Error(` this id number under  ${id} info update`);
      error.status = 404;
      throw error;
    }
 
    const updateSql = "UPDATE addresses SET ? WHERE id = ?";
    await db.query(updateSql, [ req.body,id, ]);
    res.send("Information  update");
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    console.log(error);
  }
}

async function deleteAddresses(req, res) {
  try {
    const addressesId = req.params.id;
    const query = "DELETE FROM addresses WHERE id =?";
    await db.query(query, [addressesId]);
    res.json({ message: "succes delete" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "not delete " });
  }
}

module.exports = {
  createAddresses,
  findAllAddresses,
  findAddressesById,
  updateAddresses,
  deleteAddresses,
};
