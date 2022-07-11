const express = require('express')
const Countries = express.Router()
const path = require('path')
const connection = require('../../resources/db_connections/countriesSqlDb')



Countries.get("/countries",async (req,res)=>{
    // connection.query('SELECT * FROM countries',(err,results,fields)=>{
    //     if(!err){
    //         // console.log(results)
    //         // console.log(fields)
    //         res.status(200).json(results)

    //     }
    //     else{
    //         console.log(err)
    //         res.send("sorry something went wrong! Please Check Console")
    //     }

    // })
    connection.promise().query('SELECT * FROM countries').then(([rows,fields])=>{
        res.status(200).json(rows)
    }).catch((err)=>{
        console.log(err)
        res.send("sorry something went wrong! Please check console...")
    })
    
   })
   module.exports = Countries