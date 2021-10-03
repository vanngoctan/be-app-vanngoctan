const express = require("express");
const router = express.Router();
const { Events, Users_Events, Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { response } = require("express");

router.post("/add", validateToken, async (req, res) => {
  const event = req.body;
  await Events.create({
    name: event.name,
    time: event.time,
    description: event.description,
    needInfo: event.needInfo,
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

router.put("/unsubscribe/:eventId", async (req, res) => {
  const userId = req.body.userId;

  if (!userId) return res.status(400).json("UserId is empty!");

  await Users_Events.destroy({
    where: {
      userId: req.body.userId,
      eventId: req.params.eventId
    },
  });

  res.status(200).json("SUCESS");
});

router.put("/unsubscribeall/", async (req, res) => {
  const userId = req.body.userId;

  if (!userId) return res.status(400).json("UserId is empty!");

  await Users_Events.destroy({
    where: {
      userId: req.body.userId,
    },
  });

  await Users.destroy({
    where: {
      id: req.body.userId,
    }
  })

  res.status(200).json("SUCESS");
});

module.exports = router;
