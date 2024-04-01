const app = require('./app');
const {sequelize,initialize} = require('./dao/sequelize.init');

const port = process.env.PORT || 3000;

(async() => {
    console.log('before start');
  
    await initialize();
    
    sequelize.sync()
    .then(()=> console.log('db updated'))

    module.exports = app.listen(port, ()=>{
        console.log( `app listening on  http://localhost:${port}/doc`);
    });
  })();
