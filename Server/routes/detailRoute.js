const express= require("express");
const { getOrders } = require("../controller/details");
const detailRouter= express.Router();

detailRouter.get('/orders',getOrders)

module.exports= detailRouter