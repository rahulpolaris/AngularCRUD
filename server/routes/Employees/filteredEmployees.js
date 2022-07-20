const express = require('express')
const FilteredEmployees = express.Router()
const path = require('path')
const connection = require('../../resources/db_connections/employeesSqlDb')



FilteredEmployees.get("/employees/filter/",async (req,res)=>{
    console.log(req.params)
    console.log(req.query)
    const {firstname} = req.query
    // res.send({queryReceived: true})
    // const watOrder = req.params.order.toUpperCase()
    connection.query(`SELECT * FROM employees WHERE firstname LIKE '${firstname}%' AND firstname NOT LIKE 'admin%' `,(err,results,fields)=>{
        if(!err){
            res.status(200).json(results)

        }
        else{
            console.log(err)
            res.send("sorry something went wrong! Please Check Console")
        }

    })

   })
   module.exports = FilteredEmployees