
const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing");

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
    .then(() => console.log("Connected to database"))
    .catch(err => console.log("Error in connecting to mongodb"));

Listing.insertMany(data)
    .then((res) => console.log("Initialized mongodb Successfully"))
    .catch(err => console.log("Error in initlazing to databse ", err));

