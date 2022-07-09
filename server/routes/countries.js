const express = require('express')
const Countries = express.Router()
const path = require('path')
const connection = require('../resources/countriesSqlDb')



Countries.get("/countries",async (req,res)=>{
    connection.query('SELECT * FROM countries',(err,results,fields)=>{
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
   module.exports = Countries