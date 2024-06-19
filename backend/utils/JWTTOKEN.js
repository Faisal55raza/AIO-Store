// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
   const token = user.getJWTToken();
 
   // options for cookie
   const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
  };
 
   res.status(statusCode).cookie("token", token, options).json({
     success: true,
     user,
     token,
   });
 };
 
 module.exports = sendToken;
 