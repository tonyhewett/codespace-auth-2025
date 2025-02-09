const mongoose = require("mongoose")

// const MONGODB_URL = process.env.MONGODB_URL
const { MONGODB_URL } = process.env 
console.log(MONGODB_URL);
//console.log(typeof MONGODB_URL); 

exports.connect = () => {
    mongoose.connect(MONGODB_URL, {
        //useNewUrlParser: true,
        //useUnifiedTopology: true
    })
    .then (
        console.log('database connected')    
    )
    .catch((error) => {
        console.log('db connection failed');
        console.log(error);
        process.exit(1);        // code 1 means somthing went wrong
    })
}