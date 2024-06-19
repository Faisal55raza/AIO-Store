const jwt =require('jsonwebtoken')

const cookieOptions = {
   maxAge: 15 * 24 * 60 * 60 * 1000,
   sameSite: "none",
   httpOnly: true,
   secure: true,
 };
 

 
 const sendToken = (user,statusCode,res) => {
   const token = jwt.sign({ _id: user._id },"GUGVJHBKHBJHVGCFCYFCGHVJVGHVFCFCFCNGHGCHFC");
 
   return res.status(statusCode).cookie("token", token, cookieOptions).json({
     success: true,
     user,
   });
 };

module.exports = sendToken;

