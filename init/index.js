const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/WandeLust";

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongo_url);
    console.log("Connected to db");
    try {
    console.log("Connected to db");
      await Listing.deleteMany({}); 
      console.log("Connected to db");
      await Listing.insertMany(initData.data); // Insert initial data
      console.log("Connected to db");
    } catch (err) {
      console.error("Failed to initialize data:", err);
    }
    // Initialize database
    // const initDB = async () => {
    //   console.log("Data was initialized");
      
    // };

    // // Call the initDB function after database connection
    // await initDB(); // Correctly invoking initDB()

  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

main(); // Call the main function to start the process
