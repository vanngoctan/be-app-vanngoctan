const faker = require("faker");

const events = [{
  name: "Event 1",
  time: "2021-10-20 00:00:00",
  description: "Event 1 information",
  needInfo: "workLocation",
  createdAt: new Date(),
  updatedAt: new Date(),
}, {
  name: "Event 2",
  time: "2021-10-20 00:00:00",
  description: "Event 2 information",
  needInfo: "hobbies",
  createdAt: new Date(),
  updatedAt: new Date(),
}];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Events", events, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Events", events, {});
  },
};