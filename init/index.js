const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/WandeLust";

async function main() {
  try {
    await mongoose.connect(mongo_url);
    console.log("Connected to db");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
  } catch (err) {
    console.error("Failed to initialize data:", err);
  }
};

main().then(initDB);
