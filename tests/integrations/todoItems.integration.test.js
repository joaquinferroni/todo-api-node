const request = require('supertest');
const app = require('../../app');
const todoEventSeeder = require('../../seeders/todoListSeeder');

jest.mock('../../dao/config', () => {
    const originalModule = jest.requireActual('../../dao/config');
    return {
      __esModule: true,
      ...originalModule,
      dbName: 'nodejstest-integrations'
    };
  });
const sequelize = require('../../dao/sequelize.init');


describe('Todo Item Routes',()=>{
    beforeAll(async()=>{
        await sequelize.sync({force:true});
        await todoEventSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
    })
    
    afterAll(async () => {
        await todoEventSeeder.down(sequelize.getQueryInterface(), sequelize.constructor);
        await sequelize.close();
    });



    describe('/todoItems',()=>{
        it('GET should return an array with 2 items',async ()=>{
            //Arrange
            //Act
            const response = await request(app).get('/todoItems').send();

            //Assert
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(3);
        })
    })
})