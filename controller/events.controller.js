const db = require("../config/db.config");
const Pagination = require("../helpers/pagiantion");
const eventsRoute = require("../routes/events.route");
const apiResponse = require("../helpers/apiResponse.helpers");

function createEvents(req, res) {
  try {
    sqlQuery =
      "INSERT INTO delivery (name) VALUES (?)";
    const { name } = req.body;
    db.query([name]);

    res.send("work");
  } catch (error) {
    console.error({ error: error.message });
  }
}

async function findAllEvents(req, res) {
  try {
    const page = req.query.page;
    const limit = req.query.limit;

    const countQuery = "SELECT COUNT(id) FROM events";
    const [[result]] = await db.query(countQuery);
    const totalItems = result["COUNT(id)"];
    const pagination = new Pagination(totalItems, +page, +limit);

    const [[events]] = await db.query(
      "SELECT * FROM events LIMIT ? OFFSET ? ",
      [pagination.limit, pagination.offset]
    );

    apiResponse(res, 201, events, null, pagination);
  } catch (error) {
    console.error({ error: error.message });
    console.log(error);
  }
}

async function findEventsById(req, res) {
  try {
    const id = req.params.id;
    const sqlQuery = "SELECT * FROM events WHERE id =?";
    const [[events]] = await db.query(sqlQuery, id);
    res.json(events);
  } catch (error) {
    res.json({ error: error.message });
    console.log(error);
  }
}

async function updateEvents(req, res) {
  try {
    const id = req.params.id;
    const selectSql = "SELECT * FROM events WHERE id = ?";
    const products = await db.query(selectSql, id);
    if (products.length === 0) {
      const error = new Error(` this id number under  ${id} info update`);
      error.status = 404;
      throw error;
    }
    const {name } = req.body;
    const updateSql =
      "UPDATE events SET  name = ? WHERE id = ?";
    await db.query(updateSql, [name, id]);
    res.send("Information  update");
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    console.log(error);
  }
}

async function deleteEvents(req, res) {
  try {
    const productsId = req.params.id;
    const query = "DELETE FROM events WHERE id =?";
    await db.query(query, [productsId]);
    res.json({ message: "succes delete" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "not delete " });
  }
}

module.exports = {
  createEvents,
  findAllEvents,
  findEventsById,
  updateEvents,
  deleteEvents,
};
