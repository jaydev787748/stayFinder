const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
// const methodOvr = require("method-override");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
    .then( () => console.log("Connected to MongoDB"))
    .catch(err => console.log("Failed to connect to MongoDB", err));


app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views") );

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
// app.use(metodOvr("_method"));


app.get("/", (req, res) => {
    res.send("Hello i am root");
});

app.get("/listings", (req, res) => {
   Listing.find({})
        .then(result => res.render("listing", {listings: result}))
        .catch(err => console.log("Error in fetching all listings: ", err));

});

app.get("/listings/edit/:id", (req, res) => {
    const id = req.params.id;
    Listing.findById(id)
        .then(list => res.render("edit.ejs", {list}))
        .catch(err => console.log("Error in finding listing in database"));
    
});

app.get("/listings/:id", (req, res) => {
    let {id} = req.params;

    Listing.findById(id)
        .then(result => res.render("listingDetails.ejs", {list: result}))
        .catch(err => console.log("Error in fetching listing details: ", err));
    
        
});



app.listen(8080, () => {
    console.log("Servr is running on port 8080");
});





