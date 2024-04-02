const TodoItem = require('../models/todoItem.model');

async function getAll(){
    return await TodoItem.findAll();
}

async function get(itemId){
    return await TodoItem.findByPk(itemId);
}

async function create(item){
    return await TodoItem.create(item);
}

async function update(item){
    return (await TodoItem.update(item, {where: {id: item.id}}))[0];
}

async function remove(itemId){
    return await TodoItem.destroy({where: {id : itemId}});
}

module.exports = {
    getAll,
    get,
    create,
    update,
    remove
}