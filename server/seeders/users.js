const faker = require("faker");

const { Users } = require("../models");

const users = [...Array(200)].map((user) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  workLocation: faker.address.county(),
  hobbies: faker.lorem.words(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", users, {});

    const created_users = await Users.findAll();

    const users_events = Object.values(created_users).map((value) => ({
      userId: value.id,
      eventId: Math.floor(Math.random() * 2) + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("Users_Events", users_events, {});
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Users_Events", null, {});
    return queryInterface.bulkDelete("Users", null, {});
  },
};
