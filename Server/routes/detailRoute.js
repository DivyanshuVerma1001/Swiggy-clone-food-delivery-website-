const express= require("express");
const { getOrders, addAddress, getAddress, getUserInfo } = require("../controller/details");
const userMiddleware = require("../middleware/userMiddleware");
const detailRouter= express.Router();

detailRouter.get('/orders',userMiddleware,getOrders)
detailRouter.post('/addAddress',userMiddleware,addAddress);
detailRouter.get('/getAddress',userMiddleware,getAddress)
detailRouter.get('/getUserInfo',userMiddleware,getUserInfo)

module.exports= detailRouter