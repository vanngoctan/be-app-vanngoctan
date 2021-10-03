module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define("Events", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    needInfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Events.associate = (models) => {
    Events.belongsToMany(models.Users, {
      through: "Users_Events",
    });
  };

  return Events;
};
