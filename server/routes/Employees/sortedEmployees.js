const express = require('express')
const SortedEmployees = express.Router()
const path = require('path')
const connection = require('../../resources/db_connections/employeesSqlDb')



SortedEmployees.get("/employees/:sortby/:order",async (req,res)=>{
    console.log(req.params)
    const watOrder = req.params.order.toUpperCase()
    connection.query(`SELECT * FROM employees ORDER BY ${req.params.sortby} ${watOrder}`,(err,results,fields)=>{
        if(!err){
            res.status(200).json(results)

        }
        else{
            console.log(err)
            res.send("sorry something went wrong! Please Check Console")
        }

    })
   })
   module.exports = SortedEmployees