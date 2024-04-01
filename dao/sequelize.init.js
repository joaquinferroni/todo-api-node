const{ Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const database = require('./config');




initialize();
const sequelize = new Sequelize(database.dbName, 'root', 'root', {
  host:'localhost',
  dialect: 'mysql',
  dialectOptions: {
  }
})
async function initialize() {
    // create db if it doesn't already exist 
    const { host,  user, password, dbName } = database;
    const connection = await mysql.createConnection({ host,  user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
}

module.exports = sequelize;