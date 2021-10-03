const express = require("express");
const router = express.Router();
const { Admins, Token } = require("../models");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post(
  "/add",
  validateToken,
  body("firstName").not().isEmpty().trim().escape(),
  body("lastName").not().isEmpty().trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("password").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    bcrypt.hash(req.body.password, 10).then((hash) => {
      Admins.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        role: "Admin",
      });

      res.status(200).json("SUCCESS");
    });
  }
);

router.post(
  "/login",
  body("email").isEmail().normalizeEmail(),
  body("password").not().isEmpty(),
  async (req, res) => {
    const admin = await Admins.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (admin == null) {
      return res.status(401).json("User not found!");
    } else {
      bcrypt.compare(req.body.password, admin.password).then((match) => {
        if (!match) return res.status(401).json("Wrong password!");

        const token = jwt.sign({ email: admin.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        const refreshToken = jwt.sign({ email: admin.email }, process.env.FRESH_TOKEN_SECRET);

        Token.create({
          token: refreshToken,
          userId: admin.id
        })

        res.status(200).json({ "result": "LOGGED IN", "userId": admin.id, "token": token, "refreshToken": refreshToken, "role": admin.role});
      });
    }
  }
);

router.put("/logout");

module.exports = router;
