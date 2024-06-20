const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel")



exports.isAuthentication = catchAsyncErrors( async(req,res,next) => {
  
  const { token } = req.cookies;
 
  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }
  try{
  const decodedData = jwt.verify(token,"GUGVJHBKHBJHVGCFCYFCGHVJVGHVFCFCFCNGHGCHFC");

  req.user = await User.findById(decodedData._id);
  }
  catch(err){ console.log(err)}
  next();
});

exports.authorizeroles = (...roles) => {
  
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHander('Roles : '+req.user.role+' is not allowed to access this resource',403));
        }
    

      next();
    }

}