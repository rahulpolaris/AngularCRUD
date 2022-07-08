const express = require('express')
const HomeRoute = express.Router()
const path = require('path')

const nameOnHomePage = 'Rahul'

 HomeRoute.get("/",async (req,res)=>{
 res.status(200).send("Hello World")
})
module.exports = HomeRoute