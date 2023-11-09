const db = require("../db/connection");
const {DataTypes} = require("sequelize");


const Item = db.define("item", {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    vegetarian: DataTypes.BOOLEAN
})

module.exports = Item;