const express = require("express");
const router = express.Router();
const { Events, Users, Users_Events } = require("../models");
const { body, validationResult } = require("express-validator");

router.post(
  "/:id",
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
      const userCreated = await Users.create(req.body);
      await Users_Events.create({
        UserId: userCreated.id,
        EventId: req.params.id,
      });
    } else {
      const association = await Users_Events.findOne({
        where: {
          UserId: user.id,
          EventId: req.params.id,
        },
      });

      if (association == null) {
        await Users_Events.create({
          UserId: user.id,
          EventId: req.params.id,
        });
      } else {
        return res
          .status(401)
          .json({ errors: "User has registered this event" });
      }
    }
  }
);

module.exports = router;
