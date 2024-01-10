const express = require('express')
const eventsRoute = express.Router()
const { createEvents, findAllEvents,findEventsById,updateEvents,deleteEvents } = require("../controller/events.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()




eventsRoute.post("/",createEvents)
eventsRoute.get("/", findAllEvents)
eventsRoute.get("/:id", findEventsById)
eventsRoute.patch("/:id", updateEvents)
eventsRoute.delete("/:id", deleteEvents)

module.exports = eventsRoute