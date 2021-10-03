module.exports = (sequelize, DataTypes) => {
  const UsersEvents = sequelize.define("Users_Events", {
    custom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return UsersEvents;
};
