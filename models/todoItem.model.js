const {sequelize} = require('../dao/sequelize.init');
const{ DataTypes } =  require('sequelize');


const TodoItem = sequelize.define('TodoItem', {
  text: DataTypes.STRING,
  isCompleted: {
    type:DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  completedAt: DataTypes.DATE
});

//TodoItem.sync({ alter: true });
module.exports = TodoItem;  