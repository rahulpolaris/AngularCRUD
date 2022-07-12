const express = require('express')
const Employees = express.Router()
const path = require('path')
const connection = require('../../resources/db_connections/employeesSqlDb')



Employees.get("/employees", async (req, res) => {
    connection.query(`SELECT * FROM employees `, (err, results, fields) => {
        if (!err) {
            res.status(200).json(results)

        }
        else {
            console.log(err)
            res.send("sorry something went wrong! Please Check Console")
        }

    })

})

Employees.post("/employees", async (req, res) => {
    console.log(req.body)
    console.log(req.headers)
    const { firstname, lastname, email, phone, date_of_birth, age, country, state, city } = req.body
    
    connection.query(`INSERT INTO employees (firstname,lastname,email,phone,date_of_birth,age,country,state,city) VALUES ('${firstname}', '${lastname}', '${email}', '${phone}', '${date_of_birth}', ${age}, '${country}', '${state}', '${city}')`, (err, results, fields) => {
        if (!err) {
            res.status(200).json(results)
            //  results should be like this 
            //  {
            //     "fieldCount": 0,
            //     "affectedRows": 1,
            //     "insertId": 3,
            //     "info": "",
            //     "serverStatus": 2,
            //     "warningStatus": 0
            // }
        }
        else {
            console.log(err)
            res.send("sorry something went wrong! Please Check Console")
        }
    })

    // res.status(200).json({sent:"Successful"})
})
Employees.delete("/employees/:id", async (req, res) => {
    console.log(req.body)
    // res.status(200).send({deleted:"successful"})
    connection.query(`DELETE FROM employees WHERE employees.id = ${req.params.id}`, (err, results, fields) => {
        if (!err) {
            res.status(200).json(results)
        }
        else {
            console.log(err)
            res.send("sorry something went wrong! Please Check Console")
        }


    })
})
Employees.put("/employees/:id", async (req, res) => {
    console.log(req.body)
    console.log(req.headers)

    const params_id = req.params.id
    const { id, firstname, lastname, email, phone, date_of_birth, age, country, state, city } = req.body

    connection.query(`UPDATE employees SET firstname = '${firstname}', lastname = '${lastname}', email = '${email}', phone = '${phone}', date_of_birth = '${date_of_birth}', age = ${age}, country = '${country}', state = '${state}', city = '${city}' WHERE id = ${params_id}`, (err, results, fields) => {
        if (!err) {
            res.status(200).json(results)
        }
        else {
            console.log(err)
            res.send("sorry something went wrong! Please Check Console")
        }

    })

})
module.exports = Employees