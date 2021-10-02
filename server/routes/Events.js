const express = require("express");
const router = express.Router();
const { Events } = require("../models");

router.post("/add", async (req, res) => {
    const event = req.body;
    await Events.create({
        name: event.name,
        time: event.time,
        description: event.description,
        needInfo: event.needInfo
    });
    res.json(event);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let event = await Events.findByPk(id);
    res.json(event);
});

router.get("/", async (req, res) => {
    let events = await Events.findAll();
    res.json(events);
});

module.exports = router;