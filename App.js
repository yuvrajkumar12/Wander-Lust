const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing = require("./Models/listing.js");
const path=require("path");

const mongo_url="mongodb://127.0.0.1:27017/WandeLust";
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(mongo_url);
}


app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extend:true}));

app.get("/",(req,res)=>{
    res.send("hi, I am root");
});

//index route
app.get("/listings",async(req,res)=>{
    const alllisting=await Listing.find({});
    res.render("listings/index.ejs",{alllisting});

});

//new Rot
app.get("/listingss/new",(req,res)=>{
    res.render("listings/new.ejs");
});
//Show Rout
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});


// app.get("/testListing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title:"My Home",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute, Goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("Sample Work"); 
//     res.send("successfull testing");
// });

app.listen(8080,()=>{
    console.log("server is listen");
});