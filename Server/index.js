require("dotenv").config()
const express = require('express')
const authRouter= require('./routes/userAuthRoutes')
const DBconnect= require('./database/dbConnection')
const cors= require('cors')
const app= express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json())
app.use('/user',authRouter)

DBconnect()
.then(()=>{
    console.log("Database connected successfully")
    app.listen(3000,()=>{
    console.log("listening at port number 3000")
    })
})
.catch((err)=>{
    console.log("error:",err)
})
