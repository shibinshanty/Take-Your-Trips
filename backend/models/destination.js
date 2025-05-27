const mongoose=require('mongoose')

const destinationSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:String,
    location:String,
    price:{type:Number,required:true},
    image:String
})

module.exports=mongoose.model('Destination',destinationSchema);
