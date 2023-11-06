const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res) => {
    res.json(await Restaurant.findAll())
})



module.exports = app;