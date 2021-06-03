const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//모델정보를 읽어온다.
db.User = require('./user')(sequelize, Sequelize);
db.Lecture = require('./lecture')(sequelize, Sequelize);
db.BettingLecture = require('./bettingLecture')(sequelize, Sequelize);
//db.Comment = require('./comment')(sequelize, Sequelize);

//모델간의 관계를 정의한다.
//db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
//db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
db.BettingLecture.associate = function(models) {
    db.BettingLecture.belongsTo(models.User, {
        foreignKey: 'email'
    });
    db.BettingLecture.belongsTo(models.Lecture, {
        foreignKey: 'lecture_id'
    });
}

module.exports = db;