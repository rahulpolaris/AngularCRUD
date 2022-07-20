const express = require("express");
const User = express.Router();
const path = require("path");
const connection = require("../../resources/db_connections/employeesSqlDb");
const { v4: uuidv4 } = require('uuid');


// SignUp.post("/signup",)
User.get("/users/:email",(req,res)=>{
   const {email} = req.params
   if (req?.session?.email)
   {
    connection.promise().query(`SELECT from employees WHERE email = '${email}'`).then(([rows,fields])=>{
        res.status(200).json(rows)
    }).catch(err=>{
        res.status(500).json({error:"something went wrong son"})
    })
   } 
    
})