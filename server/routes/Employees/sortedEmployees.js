const express = require('express')
const SortedEmployees = express.Router()
const path = require('path')
const connection = require('../../resources/db_connections/employeesSqlDb')



SortedEmployees.get("/employees/:sortby/:order",async (req,res)=>{
    console.log(req.params)
    // if (req.params.sortby!== "firstname" || req.params.sortby!== "state")
    // {   
    //     res.status(404).send("Not Found")
    // }
    const watOrder = req.params.order.toUpperCase()
    // if (watOrder !== "ASC" || watOrder !== "DESC"){
    //     res.status(404).send("Order Not Specified")
    // }
    // ${req.params.sortby} ${watOrder}
    connection.query(`SELECT * FROM employees ORDER BY ${req.params.sortby} ${watOrder}`,(err,results,fields)=>{
        if(!err){
            res.status(200).json(results)

        }
        else{
            console.log(err)
            res.send("sorry something went wrong! Please Check Console")
        }

    })
    // res.send("hello")
   })
   module.exports = SortedEmployees