const Restaurant = require('./Restaurant')
const Item = require("./Item");
const Menu = require("./Menu");

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

Menu.belongsToMany(Item, {through: "menu-item"});
Item.belongsToMany(Menu, {through: "menu-item"});


module.exports = {Restaurant, Menu, Item};