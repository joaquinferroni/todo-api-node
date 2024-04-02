'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('TodoItems',[
    {
      id:1,
      isCompleted:false,
      createdAt:new Date(),
      updatedAt:new Date()

    },{
      id:2,
      isCompleted:true,
      completedAt:new Date(),
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      id:3,
      isCompleted:false,  
      createdAt:new Date(),
      updatedAt:new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
 
      await queryInterface.bulkDelete('TodoItems', null, {});
     
  }
};
