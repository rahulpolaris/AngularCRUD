const express = require('express')
const Cities = express.Router()
const path = require('path')
const connection = require('../resources/countriesSqlDb')



Cities.get("/cities/:stateid",async (req,res)=>{
    connection.query(`SELECT * FROM cities WHERE state_id = ${req.params.stateid} `,(err,results,fields)=>{
        if(!err){
            console.log(results)
            console.log(fields)
            res.status(200).json(results)

        }
        else{
            console.log(err)
            res.send("sorry something went wrong! Please Check Console")
        }

    })
    
   })
   module.exports = Cities