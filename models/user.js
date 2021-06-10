module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isEmail: true
        },
        primaryKey: true
      },
      password: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      points: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        defaultValue: 5000
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('now()'),
      },
    }, {
      timestamps: false,
    });
  };