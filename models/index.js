const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//모델정보를 읽기.
db.User = require('./user')(sequelize, Sequelize);
db.Lecture = require('./lecture')(sequelize, Sequelize);
db.BettingLecture = require('./bettingLecture')(sequelize, Sequelize);

//모델간의 관계(다대다) 정의.
db.User.belongsToMany(db.Lecture, {through:db.BettingLecture, foreignKey: 'email', onDelete: 'cascade'});
db.Lecture.belongsToMany(db.User, {through:db.BettingLecture, foreignKey: 'lecture_id', onDelete: 'cascade'});

module.exports = db;