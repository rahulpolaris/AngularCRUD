// require('dotenv').config()
// const sha256 = require('hash.js/lib/hash/sha/256')
const hmacSha256 = require('crypto-js/hmac-sha256')

const express = require("express");
const fs = require('fs')
const Payment = express.Router();
const path = require("path");
const connection = require("../../resources/db_connections/employeesSqlDb");
const Razorpay = require('razorpay');




// Payment.get("/payment",(req,res)=>{
//     res.send({hello:process.env.KEY_ID})
// })
// Payment.post()
Payment.post("/generateOrder",(req,res)=>{
let amount =  req.body.amount
if(typeof(amount)==='string'){
   amount =  parseInt(amount)
}
let instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
})
const genratedOrder = instance.orders.create({
    "amount": amount*100,
    "currency": "INR",
    "receipt": "receipt#1",
    "partial_payment": false,
    "notes": {
      "key1": "value3",
      "key2": "value2"
    }
  }).then(OrderRes=>{
    console.log(OrderRes)
    res.send(OrderRes)
  }).catch(err => {
    res.send(err)
  })
//   console.log(genratedOrder)
//   res.send("hello")
})

Payment.post("/verifyPayment",(req,res)=>{
    console.log(req.body)
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body
    const generatedSignature = hmacSha256(razorpay_payment_id+'|'+razorpay_order_id,process.env.KEY_SECRET).toString()
    if(razorpay_signature === generatedSignature){
        // res.send({paymentSuccessful:true})
        connection
        .promise()
        .query(`INSERT into payments (razorpay_payment_id, razorpay_order_id, razorpay_signature) VALUES ('${razorpay_payment_id}',${ razorpay_order_id},${razorpay_signature})`)
        .then(([rows,fields])=>{
        //   console.log(rows)
        res.send({paymentSuccessful:true,rows})
        })
        .catch(err => {
            res.status(err.code).send({error:err})
        })

    }
    else{
        res.send({paymentSuccessful:false})
    }
})
module.exports = Payment