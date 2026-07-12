  const mongoose = require('mongoose');

  const userSchema = new mongoose.Schema({
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

userSchema.pre("save", async (next)=>{ // this function checks whether the user changed their password previously or not
    if(!this.isModified(password)){
        return next(); //here if password is not change simply exicute the next function
    }
    //if password doo changed first=> hash it and then save it in password 
    const hash = await bcrypt.hash(this.password , 11);
    this.password= hash;
    return next();

})

//Adding the  compare METHOD for comparing the password's hash is matching or not

userSchema.method.comparePassword = async (password)=>{
    return await bcrypt.compare(password , this.password);
}

const userModel = mongoose.model("user" , userSchema);

module.exports= {
    userModel
}