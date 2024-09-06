const express = require('express');
const app = express();
const mongoose=require("mongoose");
const Listing = require("./Models/listing.js");
const path=require("path");

const methodOverride = require("method-override");
const ejsMate=require("ejs-mate"); //it create layout npm instal ejs-mate
const cors=require("cors");

const mongo_url="mongodb://127.0.0.1:27017/WandeLust";
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(mongo_url);
}

app.engine('ejs', ejsMate);
app.set("view engine","ejs");
app.use(express.static('public'));
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(cors());


app.get("/",(req,res)=>{
    res.send("hi, I am root");
});
app.get("/listings", async (req, res) => {
        const alllisting = await Listing.find({});
        res.render("listings/index", { alllisting });
        
 });
//new Rot
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
//Show Rout
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//Create Rout Add
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//Edit Rout
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});  
})

//Update Rout
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  });

  
//Delete Rout
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
});

//
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

app.listen(8000,()=>{
    console.log("server is listen");
});