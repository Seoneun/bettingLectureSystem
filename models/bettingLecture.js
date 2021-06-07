module.exports = (sequelize, DataTypes) => {
    return sequelize.define('bettingLecture', {
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true
        },
        primaryKey: true
        },
      lecture_id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        //unique: true,
      },
      betting_points: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
    }, {
      timestamps: false,
    });
  };