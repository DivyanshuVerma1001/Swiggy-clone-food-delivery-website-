const mongoose = require('mongoose');
const DBconnect= async ()=>{
    await mongoose.connect(process.env.DB_CONNECT_STRING);
}
module.exports= DBconnect;