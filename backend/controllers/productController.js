const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeature")
const cloudinary = require("cloudinary");

exports.createProduct = catchAsyncErrors(async(req,res,next) => {

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user._id;
    
    
     
    
    const product = await Product.create(req.body);
    
    res.status(201).json({
        succes:true,
        product,
    })
})





exports.getALLProducts = catchAsyncErrors(async(req,res,next) => {
    
    const resultPerPage = 4;
    const productsCount = await Product.countDocuments();
   
    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    
  let products = await apiFeature.query;
  
  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();
   
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
})
});

exports.getAdminProducts = catchAsyncErrors(async(req,res,next) => {
    
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products
})
});

exports.updateProduct = catchAsyncErrors(async(req,res,next) =>{

    let product = await Product.findById(req.params.id);
     
    if(!product){
        return next(new ErrorHander("Poduct not found",404))

    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        succes:true,
        product
    })

});

exports.deleteProduct = catchAsyncErrors(async(req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Poduct not found",404))

    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
      
    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product deleted succesfully"
    })
})

exports.getProductDetails = catchAsyncErrors(async(req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Poduct not found",404))
    }

        res.status(200).json({
            succes:true,
            product,
           
        })
    
})
exports.createProductReview = catchAsyncErrors( async(req,res,next) => {

    const { rating,comment, productId } = req.body;
  
    const review = {
      user:req.user._id,
      name:req.user.name,
      rating:Number(rating),
      comment,
    }
  
    const product =  await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if(isReviewed){
        product.reviews.forEach((rev) => {
           if(rev.user.toString() === req.user._id.toString())
           (rev.rating = rating),(rev.comment = comment)
        });
    }
    else{
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length
    }

    let avg=0;
    product.rating = product.reviews.forEach( rev => {
        avg+=rev.rating;
    }) 

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave:false });

    res.status(200).json({
        success:true
    })
  });

  exports.getAllReview = catchAsyncErrors( async(req,res,next) => {

    const product =await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHander("Poduct not found",404));
    }
    
    res.status(200).json({
        success:true,
        reviews: product.reviews,
    })

  });

  exports.deleteReview = catchAsyncErrors(async(req,res,next) => {

    const product = await Product.findById(req.query.productId);
     
    if(!product){
        return next(new ErrorHander("Poduct not found",404));
    }
    const reviews = product.reviews.filter( 
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

     reviews.forEach((rev) => {
        avg+= rev.rating;
     })
   
     const ratings = avg / reviews.length;

     const numberOfReviews = reviews.length;

     await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numberOfReviews,
     },
     {
        new:true,
        runValidators: true,
        useFindAndModify: false,
     })
     res.status(200).json({
        success:true,
     })
  });

  