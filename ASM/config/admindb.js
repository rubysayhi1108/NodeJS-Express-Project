const Sequelize = require('sequelize');
const sequelize = new Sequelize('ruby-watch', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
