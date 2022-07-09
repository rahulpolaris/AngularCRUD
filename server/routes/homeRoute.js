const express = require('express')
const HomeRoute = express.Router()
const path = require('path')


 HomeRoute.get("/",async (req,res)=>{
 res.status(200).send("Hello World")
})
module.exports = HomeRoute
