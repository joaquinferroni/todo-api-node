const{ Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodejstest-integrations', 'root', 'root', {
    host:'localhost',
    dialect: 'mysql',
    dialectOptions: {
    }
  })

module.exports = sequelize;