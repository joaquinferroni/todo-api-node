const express = require('express');
const router = express.Router({mergeParams:true});
const {validationResult} = require('express-validator');
const todoItemValidator = require('./validators/todoItem.validator');


const todoItemsController = require('../controllers/todoItems.js');

router.get('/',todoItemsController.get);

router.get('/:id',todoItemsController.getById);

router.post('/',todoItemValidator, (req, res)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return todoItemsController.post(req,res);
    }
    return res.status(400).send({errors:errors.array()});
});

router.put('/:id',todoItemValidator, (req, res)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return todoItemsController.put(req,res);
    }
    return res.status(400).send({errors:errors.array()});
});

router.delete('/:id',todoItemsController.remove);


module.exports = router;