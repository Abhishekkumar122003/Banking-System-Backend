  const mongoose = require('mongoose');

  const userSchema = mongoose.Schema({
    email: {
        type:String,
        required:[ true, "Email is required for creating the User" ],
        trim:true, //it tream all the extra spaces
        lowercase:true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/], //check whether the user provide the email is actual in a email formet
        unique:[true , "Email already exists."]
    },
    name:{
        type:String,
        required:[true , "Name is required for creating the Account"]
    },
    password: {
        type:String,
        required: [true, "Password is required for the authentication"],
        unique:[true, "password is taken"],
        minlength:[7, "Password should be minimum 6 characters"],
        select: false
    },
    
  } , 
    {
        timestemp:true
    }    
)