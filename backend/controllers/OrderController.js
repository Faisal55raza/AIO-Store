const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


exports.newOrder = catchAsyncErrors( async(req,res,next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user : req.user._id,
    });

    res.status(201).json({
        success:true,
        order
    });
   
    
});

exports.getSingleOrder = catchAsyncErrors( async(req,res,next) => {

     const order = await Order.findById(req.params.id).populate("user","name email");

     if(!order){
        return next(new ErrorHander("Order not found with this Id",404));
     }

     res.status(200).json({
        success:true,
        order
     })
});

exports.myOrder = catchAsyncErrors( async(req,res,next) => {
    const order = await Order.find({ user:req.user._id});
     
    if(!order){
       return next(new ErrorHander("Order not found with this Id",404));
    }

    res.status(200).json({
       success:true,
       order
    })
});

//Admin
exports.getAllOrders = catchAsyncErrors( async(req,res,next) => {
    const orders = await Order.find();

    let total =0;

    orders.forEach((order) => {
        total+= order.totalPrice;
    })

    res.status(200).json({
       success:true,
       total,
       orders,

    })
});

//Admin
exports.updateOrderStatus = catchAsyncErrors( async(req,res,next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHander("Order not found with this Id",404));
     }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHander("You have already delivered this order",400));
    }
    order.orderItems.forEach(async(order) => {
        await updateStock(order.product,order.quantity);
    })

    order.orderStatus = req.body.status;

    if(order.orderStatus === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:false});

    res.status(200).json({
       success:true,
     })
});

async function updateStock(id,quantity){
    const product = await Product.findById(id);
    
    product.stock-=quantity;

    await product.save({validateBeforeSave:false});

}

//Admin
exports.deleteOrder = catchAsyncErrors( async(req,res,next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
       return next(new ErrorHander("Order not found with this Id",404));
    }
    
    await order.deleteOne();

    res.status(200).json({
       success:true,
       message:"Order deleted successfully"
    })
});


