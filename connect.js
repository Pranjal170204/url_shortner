const mongoose=require('mongoose')

const connectDB = async function (URL){
    return await mongoose.connect(URL); 
}

module.exports={connectDB};
