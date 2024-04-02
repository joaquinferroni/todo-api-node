const request = require('supertest');
const app = require('../../app');
const todoEventSeeder = require('../seeders/todoListSeeder');

jest.mock('../../src/dao/config', () => {
    const originalModule = jest.requireActual('../../src/dao/config');
    return {
      __esModule: true,
      ...originalModule,
      dbName: 'nodejstest-integrations'
    };
  });
const {sequelize,initialize} = require('../../src/dao/sequelize.init');


describe('Todo Item Routes',()=>{
    beforeAll(async()=>{
        await initialize();
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
        });

        it('GET by id should return an item',async ()=>{
            //Arrange
            //Act
            const response = await request(app).get('/todoItems/1').send();

            //Assert
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
        });

        it('GET by id should return 404 because item not found',async ()=>{
            //Arrange
            //Act
            const response = await request(app).get('/todoItems/1000').send();

            //Assert
            expect(response.status).toBe(404);
            expect(response.body.id).toBeUndefined();
        })

        it('POST fails because of text missing',async ()=>{
            //Arrange
            const model = {};
            //Act
            const response = await request(app).post('/todoItems').send(model);

            //Assert
            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
        })

        it('POST succeed because of required fields completed',async ()=>{
            //Arrange
            const model = {text:"test"};
            //Act
            const response = await request(app).post('/todoItems').send(model);
            const itemFromDb = await request(app).get(`/todoItems/${response.body.id}`).send();


            //Assert
            expect(response.status).toBe(201);
            expect(itemFromDb.body.text).toBe(model.text);
        })

        it('PUT should update text value',async ()=>{
            //Arrange
            const id = 1;
            const newText = 'updated';
            //Act
            const itemFromDb = await request(app).get(`/todoItems/${id}`).send();
            itemFromDb.body.text = newText;
            const response = await request(app).put(`/todoItems/${id}`).send(itemFromDb.body);
            const updatedItemFromDb = await request(app).get(`/todoItems/${id}`).send();

            //Assert
            expect(response.status).toBe(200);
            expect(updatedItemFromDb.body.text).toBe(newText);
        })

        it('DELETE should remove the entity from db',async ()=>{
            //Arrange
            const id = 1;
            //Act
            const itemFromDb = await request(app).get(`/todoItems/${id}`).send();
            const response = await request(app).delete(`/todoItems/${id}`).send();
            const udeletedItemFromDb = await request(app).get(`/todoItems/${id}`).send();

            //Assert
            expect(response.status).toBe(200);
            expect(itemFromDb.status).toBe(200);
            expect(udeletedItemFromDb.status).toBe(404);
        })


    })
})