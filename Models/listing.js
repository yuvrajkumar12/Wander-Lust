const mongoose=require("mongoose");
const review = require("./review");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type: String,
        require: true,
    },
    description: String,
    image:{ 
        type: String,
        default:"https://unsplash.com/photos/aerial-photography-of-high-rise-building-9CPAjGVB378",
        set: (v)=>v===""?"https://unsplash.com/photos/aerial-photography-of-high-rise-building-9CPAjGVB378":v,
    },
    price:Number,
    location: String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review "

        }
    ]
});

//Create Modle
const listing=mongoose.model("listing",listingSchema);
module.exports= listing; 
