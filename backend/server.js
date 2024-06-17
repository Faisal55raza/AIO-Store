const app = require("./app");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception');
    
    
        process.exit(1);

})



dotenv.config({
    path:"config/config.env"
})

connectDatabase();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_SECRET_KEY,

})

const server = app.listen(process.env.PORT,()=>{
    console.log('server is working on http://localhost:'+process.env.PORT);
})


process.on("unhandledRejection",(err) => {
    console.log('Error: '+err.message);
    console.log('Shutting down the server due to unhandeled proise rejection');
    
    server.close(()=>{
        process.exit(1);
    })
})

