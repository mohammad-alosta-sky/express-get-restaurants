const express = require("express");
const app = express();
const {Restaurant, Menu, Item} = require("../models/index")
const db = require("../db/connection");

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res) => {
    res.json(await Restaurant.findAll({include: Menu}))
})

app.get("/restaurants/:id", async (req, res) => {
    res.json(await Restaurant.findByPk(req.params.id))
})

app.post("/restaurants", async (req, res) => {
    // console.log("post req \n", req.body)
    const addedRestaurant = await Restaurant.create(req.body);
    res.json(await Restaurant.findAll());
    
})

app.put("/restaurants/:id", async (req, res) => {
    await Restaurant.update(req.body, {where: { id:req.params.id}});
    res.json(await Restaurant.findByPk(req.params.id))
})

app.delete("/restaurants/:id", async (req, res) => {
    await Restaurant.destroy({where: {id:req.params.id}});
    res.json({dataDeleted: true});
})
module.exports = app;