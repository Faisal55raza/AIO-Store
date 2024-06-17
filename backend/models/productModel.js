const mongoose =  require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter product name"],
        trim:true,
    },
    description:{
        type:String,
        required:[true, "Please enter product description"],
    },
    price:{
        type:Number,
        required:[true, "Please enter product price"],
        maxLength:[7,"Price cannot exceed 7 characters"],
    },
    ratings:{
        type:Number,
        default:0,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ],
    category:{
        type:String,
        required:[true, "Please enter product category"],
    },
    stock:{
        type:Number,
        required:[true, "Please enter product Stock"],
        maxlength:[4, "Stock cannot exceed 4 characters"],
        default:1,
    },
    numberOfReviews:{
        type:Number,
        default:0,
    },
    
reviews:[
    {
        user:{
            type : mongoose.Schema.ObjectId,
            ref:'User',
            required: true 

         },
        name:{
            type:String,
            required:true,
        },
        rating:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true,
        }
    }
],
        user:{
            type : mongoose.Schema.ObjectId,
            ref:'User',
            required: true 

         },

    createdAt:{
        type:Date,
        default:Date.now,
    }
})



module.exports = mongoose.model("Product", productSchema);