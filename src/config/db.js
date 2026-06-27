const mongoose = require('mongoose');

  function connectToDB(){
// console.log(process.env.MONGO_URI);
     mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server is connected to DataBase");
    })
    .catch(err =>{
        console.log("ERROR connecting to DataBase");
        process.exit(1); // this line exsecute when the ".catch" block run mean some ERROR happend during connecting to DB
    })
 }

 module.exports = connectToDB