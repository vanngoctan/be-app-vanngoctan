const faker = require("faker");

const admin = [{
  firstName: "Tan",
  lastName: "Van",
  email: "tanvan@example.com",
  password: "$2b$10$DRRolDoBTPIssivk5i6aUei9cjON6yHvQY1OD64mnuzjmaEUGZ/au",
  role: "Admin",
  createdAt: new Date(),
  updatedAt: new Date(),
}];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Admins", admin, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Admins", admin, {});
  },
};