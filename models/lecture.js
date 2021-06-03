module.exports = (sequelize, DataTypes) => {
    return sequelize.define('lecture', {
      lecture_id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      lecture_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER(20),
        allowNull: false
      },
    }, {
      timestamps: false,
    });
  };