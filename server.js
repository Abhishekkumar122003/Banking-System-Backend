require("dotenv").config(); // jbtk mai yaha isse nhi write kruga tbtk mai process.env.example nhi istamal krr skta
//import the app instance here and run the server
const app = require("./src/app");

const connectToDB = require("./src/config/db"); 

connectToDB() // I call this to connect to DB


app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})
