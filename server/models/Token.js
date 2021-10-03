module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define("Token", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Token.associate = (models) => {
    Token.belongsTo(models.Users, {
      foreignKey: "userId",
    });
  };

  return Token;
};
