const express = require("express");
const router = express.Router();
const { Events, Users, Users_Events } = require("../models");
const { body, validationResult } = require("express-validator");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post(
  "/edit",
  validateToken,
  body("firstName").not().isEmpty().trim().escape(),
  body("lastName").not().isEmpty().trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("workLocation").trim().escape(),
  body("hobbies").trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (user == null) {
      return res.status(400).json("User not found");
    } else {
      await Users.update(req.body, {
        where: {
          email: req.body.email,
        },
      });
      return res.status(200).json("Edit Success!");
    }
  }
);

router.get("/get/:userId", validateToken, async (req, res) => {
  const user = await Users.findOne({ where: { id: req.params.userId } });

  if (!user) {
    return res.status(400).json("User not found!");
  } else {
    return res.status(200).json(user);
  }
});

router.post("/statistic ", validateToken, async (req, res) => {
  let email = req.body.email;

  if (!email) return res.status(400).json("Empty Email!");

  const user = await Users.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).json("User not found");

  const events = await Events.findOne({
    include: Users,
    where: {
      id: user.id
    }
  });

  return res.status(200).json({ "user": user, "events": events });
});

module.exports = router;
