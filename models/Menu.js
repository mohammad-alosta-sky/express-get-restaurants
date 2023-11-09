const db = require("../db/connection");
const {DataTypes} = require("sequelize");

const Menu = db.define("menu", {
    title: DataTypes.STRING
})

module.exports = Menu;