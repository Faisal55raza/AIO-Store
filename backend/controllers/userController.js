const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const express = require("express");
const sendToken = require("../utils/JWTTOKEN");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
const cloudinary =require("cloudinary");

exports.registerUser = catchAsyncErrors(async (req,res,next) => {
  
  let myCloud;
  try {
    // Upload avatar to Cloudinary
    myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
  } catch (err) {
    // Handle Cloudinary upload error
    console.error("Error uploading avatar to Cloudinary:", err);
    return next(new ErrorHander("Avatar upload failed", 400));
  }

    const {name,email,password} = req.body;
    

    
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
    });
     
   

    sendToken(user,200,res);
  
  
    
})


exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHander("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
  
    const isCorresctPassword = await user.comparePassword(password);
  
    if (!isCorresctPassword) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
  
    sendToken(user,200,res);
    
})

exports.logout = catchAsyncErrors( async(req,res,next) => {

  res.cookie('token',null,{
    expires : new Date(Date.now()),
    httpOnly : true,
  });

  res.status(200).json({
    success:true,
    message :"Logout Succesfully"
  })
})

exports.forgotPassword = catchAsyncErrors( async(req,res,next) => {

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
 
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

exports.resetPassword = catchAsyncErrors( async(req,res,next) => {

  
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({ resetPasswordToken,resetPasswordExpire:{ $gt:Date.now()},
});



if(!user){
  return next(new ErrorHander("Reset password token is invalid or expired"),400);
}

if( req.body.password !== req.body.confirmPassword){
  return next(new ErrorHander("Password does not match"),400);
}

user.password = req.body.password;
user.resetPasswordExpire = undefined;
user.resetPasswordToken = undefined;

await user.save();

sendToken(user,200,res);
});

exports.getUserDetails = catchAsyncErrors( async(req,res,next) => {

  const user = await User.findById(req.user._id);

  res.status(200).json({
    success:true,
    user
  })

})

exports.updatePassword = catchAsyncErrors( async(req,res,next) => {

  const user = await User.findById(req.user._id).select("+password");

  
  const isCorresctPassword = await user.comparePassword(req.body.oldPassword);
  
  if (!isCorresctPassword) {
    return next(new ErrorHander("Old password is incorrecct", 401));
  }
   if(req.body.newPassword !== req.body.confirmPassword ){
  return next(new ErrorHander("Password does not match"),400);
  }

   user.password = req.body.newPassword;

   await user.save();

   sendToken(user,200,res);

})

exports.updateProfile = catchAsyncErrors( async(req,res,next) => {
  
  const newUserData = {
    name : req.body.name,
    email : req.body.email,
  }


  if( req.body.avatar !== ""){
   
 const userp = await User.findById(req.user.id);

 const imageId = userp.avatar.public_id;
 const options = {
  timeout: 30000 
};

await cloudinary.v2.uploader.destroy(imageId, options);

 
 const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  folder: "avatars",
  width: 150,
  crop: "scale",
  timeout:30000
 });
  
  

newUserData.avatar = {
  public_id: myCloud.public_id,
  url: myCloud.secure_url,

}
}

  const user = await User.findByIdAndUpdate(req.user._id, newUserData , {
    new:true,
    runValidators:true,
    useFindAndModify: false,
  })
  
  res.status(200).json({
    success:true
  })
  
})
//<admin>
exports.getAllUSers = catchAsyncErrors( async(req,res,next) => {

  const users = await User.find();

  res.status(200).json({
    success:true,
    users
  })
});
//<Admin>
exports.getSingleUser = catchAsyncErrors( async(req,res,next) => {

  const user = await User.findById(req.params.id);

  if(!user){
    return next(new ErrorHander("User does not exist with id : "+req.params.id));
  }

  res.status(200).json({
    success:true,
    user
  })
});

//<Admin>
exports.updateUserRole = catchAsyncErrors( async(req,res,next) => {

  const newUserData = {
    name : req.body.name,
    email : req.body.email,
    role : req.body.role,
  }
 
  const user = await User.findByIdAndUpdate(req.params.id, newUserData , {
    new:true,
    runValidators:true,
    useFindAndModify: false,
  })
  
  res.status(200).json({
    success:true
  })
})
//<Admin>
exports.deleteUser = catchAsyncErrors( async(req,res,next) => {

 
  const user = await User.findById(req.params.id)

  if(!user){
    return next(new ErrorHander("User does not exit with id : "+req.params.id));
  }

  await user.deleteOne();

  
  res.status(200).json({
    success:true,
    message:"User Deleted Successfully"
  })
})

