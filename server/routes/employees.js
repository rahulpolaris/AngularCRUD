const express = require('express')
const Employees = express.Router()
const path = require('path')
const connection = require('../resources/connections/employeesSqlDb')



Employees.get("/employees",async (req,res)=>{
    connection.query(`SELECT * FROM employees `,(err,results,fields)=>{
        if(!err){
            res.status(200).json(results)

        }
        else{
            console.log(err)
            res.send("sorry something went wrong! Please Check Console")
        }

    })
    
   })
   module.exports = Employees