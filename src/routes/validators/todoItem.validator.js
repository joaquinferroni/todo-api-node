const {body} = require('express-validator');

module.exports =  todoItemCreateValidator = [
  body('text', 'Text is required').not().isEmpty(),
]