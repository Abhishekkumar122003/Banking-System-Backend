const mongoose = require('mongoose');
console.log(process.env.MONGO_URI);
console.log("hi theresdsdsdk")
 async function connectToDB(){
     mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server is connected to DataBase");
    })
    .catch(err =>{
        console.log("ERROR connecting to DataBase");
        process.exit(1); // this line exsecute when the ".catch" block run mean some ERROR happend during connecting to DB . so it stop the server
    })
 }
 

 module.exports = connectToDB