
const todoItemService = require('../../services/todoItemsService');
const todoItemModel = require('../../models/todoItem.model');   

jest.mock('../../models/todoItem.model');

describe('Todo Items Get', ()=> {
    describe('Get All', ()=>{
        afterEach(()=>{
            jest.clearAllMocks();
        });

        it('should return all items in database',async ()=>{
            //Arrange
            const mockItems = [{id:1}, {id:2}];
            todoItemModel.findAll.mockResolvedValue(mockItems);
            
            //Act
            const result = await todoItemService.getAll();

            //Assert
            expect(result).toHaveLength(2);
            expect(todoItemModel.findAll).toHaveBeenCalledTimes(1);
        });

        it('should return empty if zero items',async ()=>{
            //Arrange
            const mockItems = [];
            todoItemModel.findAll.mockResolvedValue(mockItems);
            
            //Act
            const result = await todoItemService.getAll();

            //Assert
            expect(result).toHaveLength(0);
            expect(todoItemModel.findAll).toHaveBeenCalledTimes(1);
        });

    });

    describe("Get by Id", ()=>{
        it("should return an item if present", async () => {
            //Arrange
            const mockItem = {id:1};
            todoItemModel.findByPk.mockResolvedValue(mockItem);

            //Act
            const result = await todoItemService.get(1);

            //Assert
            expect(result.id).toBe(1);
        });

        it("should return null because item is not present", async () => {
            //Arrange
            const mockItem = null;
            todoItemModel.findByPk.mockResolvedValue(mockItem);

            //Act
            const result = await todoItemService.get(1);

            //Assert
            expect(result).toBeNull();
        })
    })
})