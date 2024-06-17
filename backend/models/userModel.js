const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs =  require('bcryptjs')
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
   name:{
    type: String,
    required:[true,"Please enter your name"],
    maxLength:[30,"cannot exceed 30 characters"],
    minLength:[5,"should exceed 5 characters"]
   },
   email:{
    type: String,
    required:[true,"Please enter your email"],
    unique:true,
    validate:[validator.isEmail,"Please enter a valid mail"]
   },
   password:{
    type: String,
    required:[true,"Please enter your password"],
    minLength:[8,"should exceed 5 characters"],
    select:false
   },
   avatar:{
      public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    
   },
   createdAT:{
    type:Date,
    default:Date.now(),
   },
   role:{
    type:String,
    default:"user"
   },
   resetPasswordToken: String,
   resetPasswordExpire: Date,

});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcryptjs.hash(this.password,10)
});

userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

// password commpare


userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
  };

//Generating Password Reset token
userSchema.methods.getResetPasswordToken = function(){
//gnerating Token

const resetToken = crypto.randomBytes(20).toString("hex");

//Hashing and adding reset token to userschma
this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

this.resetPasswordExpire = Date.now()+15*60*1000;

return  resetToken;
}

module.exports = mongoose.model("User",userSchema);