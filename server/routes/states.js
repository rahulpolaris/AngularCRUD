const express = require('express')
const States = express.Router()
const path = require('path')
const connection = require('../resources/connections/countriesSqlDb')



States.get("/states/:countryid",async (req,res)=>{
    connection.query(`SELECT * FROM states WHERE country_id = ${req.params.countryid} `,(err,results,fields)=>{
        if(!err){
            // console.log(results)
            // console.log(fields)
            res.status(200).json(results)

        }
        else{
            console.log(err)
            res.send("sorry something went wrong! Please Check Console")
        }

    })
    
   })
   module.exports = States