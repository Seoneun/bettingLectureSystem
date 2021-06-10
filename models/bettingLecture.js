module.exports = (sequelize, DataTypes) => {
    return sequelize.define('bettingLecture', {
      betting_points: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
    }, {
      timestamps: false,
    });
  };