const express = require("express");
const router = express.Router();
const { Events, Users, Users_Events } = require("../models");

const getUsers = (page, req, res) => {
  let limit = 10;
  Users.findAndCountAll({
    include: {
      model: Events,
      where: {
        id: req.params.id,
      },
    },
  }).then((data) => {
    let pages = Math.ceil(data.count / limit);
    offset = limit * (page - 1);
    Users.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "workLocation",
        "hobbies",
      ],
      limit: limit,
      offset: offset,
      include: {
        model: Events,
        where: {
          id: req.params.id,
        },
      },
    }).then((users) => {
      res.status(200).json({
        result: users,
        count: data.count,
        pages: pages,
        current: parseInt(page),
      });
    });
  });
};

router.get("/:id", async (req, res) => {
  await getUsers(1, req, res);
});

router.get("/:id/page/:pageId", async (req, res) => {
  await getUsers(req.params.pageId, req, res);
});

module.exports = router;
