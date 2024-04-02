const todoItemService = require('../services/todoItemsService');

const get = async function(req, res){
    /*  #swagger.tags = ['TodoItems'] */ 
    const items = await todoItemService.getAll();
    return res.send(items);
}

const getById = async function(req, res){
    /*  #swagger.tags = ['TodoItems'] */ 
    const item = await todoItemService.get(req.params['id']);
    if(!item){
        return res.status(404).send();
    }
    return res.send(item);
}

const post = async function(req,res){
    /*  #swagger.tags = ['TodoItems'] 
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add a todo item',
            schema: { $ref: "#/definitions/TodoItem" }

    } 
    */
    const result = await todoItemService.create(req.body);
    return res.status(201).send(result);
}

const put = async function(req,res){
    /*  #swagger.tags = ['TodoItems'] 
        #swagger.parameters['id'] = {
                in: 'path',
                description: 'Item ID.',
                required: true
            }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add a todo item',
            schema: { $ref: "#/definitions/TodoItem" }
    } 
    */
    const result = await todoItemService.update(req.body);
    if(result <=0 ){
        res.status(400).send({"message": "There was a problem updating your entity. Please try again"});
    }
    return res.status(200).send();
}

const remove = async function(req, res){
    /*  #swagger.tags = ['TodoItems'] 
        #swagger.method = 'delete'
        #swagger.parameters['id'] = {
                in: 'path',
                description: 'Item ID that will be removed.',
                required: true
            } 
    */
   const itemToRemove = await todoItemService.get(req.params.id);
   if(!itemToRemove){
    return res.status(404).send();
   }
   await todoItemService.remove(itemToRemove.id);
   return res.status(200).send();
}



module.exports = {
    get,
    getById,
    post,
    put,
    remove
};